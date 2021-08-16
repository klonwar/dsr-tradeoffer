import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { Repository } from 'typeorm';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async getItem(id: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne(id, {
      relations: [`photos`, `user`, `item_category`, `trade_category`],
    });

    if (!item) throw new NotFoundException(ErrorMessagesEnum.NO_SUCH_ITEM);

    console.log(item);

    return item;
  }
}
