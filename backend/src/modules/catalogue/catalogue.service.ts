import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { PaginationRequestDto } from '#server/common/dto/pagination-request.dto';
import { PAGE_SIZE } from '#server/common/constants/constants';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { paginate, paginateRaw, Pagination } from 'nestjs-typeorm-paginate';
import { CatalogueDto } from '#server/common/dto/catalogue.dto';
import { ItemDto } from '#server/common/dto/item.dto';
import { User } from '#src/modules/user/entity/user.entity';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async getItemsList(props: PaginationRequestDto): Promise<CatalogueDto> {
    const {
      page = 1,
      order = `id`,
      orderDirection = `ASC`,
      query = ``,
    } = props;

    const paginatedItems = await paginate<ItemEntity>(
      this.itemRepository,
      {
        page,
        limit: PAGE_SIZE,
      },
      {
        where: {
          name: Like(`%${query}%`),
        },
        relations: [`photos`, `item_category`, `trade_category`, `user`],
        order: {
          [order]: orderDirection.toUpperCase(),
        },
      },
    );

    return new Pagination<ItemDto>(
      paginatedItems.items.map((item) => item.toDto()),
      paginatedItems.meta,
    );
  }

  async getRecommendationsList(
    user: User,
    props: PaginationRequestDto,
  ): Promise<CatalogueDto> {
    const {
      page = 1,
      order = `id`,
      orderDirection = `ASC`,
      query = ``,
    } = props;

    const userItems = await this.itemRepository.find({ user });

    /*
     * Через репозиторий такой сложный запрос не напишешь, он не умеет в скобки.
     * Через QB, если использовать джоины, то ломается пагинатор из-за связи
     * многие-ко-многим Фотографии-Вещи. Он считает количество сджойненных полей,
     * а надо количество вещей. Поэтому поступаю следующим образом - нахожу
     * пагинированные id-шники и потом по ним выбираю сущности через репозиторий
     * */

    const qb = this.itemRepository
      .createQueryBuilder(`item`)
      .select(`id`)
      .where(`name LIKE %:query%`, { query })
      .where(`item.user_id != :userId`, { userId: user.id })
      .andWhere(
        new Brackets((qb) => {
          userItems.forEach((item, index) => {
            qb.orWhere(
              new Brackets((qb) => {
                qb.where(`item_category_id = :ici_${index}`, {
                  [`ici_${index}`]: item.trade_category_id,
                });
                qb.andWhere(`trade_category_id = :tci_${index}`, {
                  [`tci_${index}`]: item.item_category_id,
                });
              }),
            );
          });
        }),
      )
      .orderBy(order, orderDirection as any);

    const result = await paginateRaw<{ id: number }>(qb, {
      page,
      limit: PAGE_SIZE,
    });
    const paginatedIds = result.items.map((item) => item.id);

    /*
     * Сортировка по query уже произошла, а вот порядок сбросился.
     * Поэтому напишем еще раз order
     * */

    const paginatedItems = await this.itemRepository.findByIds(paginatedIds, {
      relations: [`photos`, `item_category`, `trade_category`, `user`],
      order: {
        [order]: orderDirection.toUpperCase(),
      },
    });

    return new Pagination<ItemDto>(
      paginatedItems.map((item) => item.toDto()),
      result.meta,
    );
  }

  async deleteCatalogueItem(id: number): Promise<boolean> {
    const item = await this.itemRepository.findOne(id);

    if (!item) throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    await this.itemRepository.remove(item);

    return true;
  }
}
