import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LoadCatalogueDto } from '#server/common/dto/load-catalogue.dto';
import { PAGE_SIZE } from '#server/common/constants/constants';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CatalogueDto } from '#server/common/dto/catalogue.dto';
import { ItemDto } from '#server/common/dto/item.dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async getItemsList(props: LoadCatalogueDto): Promise<CatalogueDto> {
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

  async deleteCatalogueItem(id: number): Promise<boolean> {
    const item = await this.itemRepository.findOne(id);

    if (!item) throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    await this.itemRepository.remove(item);

    return true;
  }
}
