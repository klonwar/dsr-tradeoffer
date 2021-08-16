import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from '#src/modules/items/entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { LoadCatalogueDto } from '#server/common/dto/load-catalogue.dto';
import { PAGE_SIZE } from '#server/common/constants/constants';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async getItemsList(props: LoadCatalogueDto): Promise<Array<ItemEntity>> {
    const {
      page = 1,
      order = `id`,
      orderDirection = `ASC`,
      query = ``,
    } = props;

    // В доках прочитал, что якобы от sql инъекций Like защищен
    return await this.itemRepository.find({
      where: {
        name: Like(`%${query}%`),
      },
      relations: [`photos`, `item_category`, `trade_category`, `user`],
      order: {
        [order]: orderDirection.toUpperCase(),
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });
  }

  async deleteCatalogueItem(id: number): Promise<boolean> {
    const item = await this.itemRepository.findOne(id);

    if (!item) throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    await this.itemRepository.remove(item);

    return true;
  }
}
