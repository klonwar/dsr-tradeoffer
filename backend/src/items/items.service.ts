import { Injectable } from '@nestjs/common';
import { User } from '#src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/items/entity/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemsRepository: Repository<ItemEntity>,
  ) {}

  async getAllUserItems(user: User): Promise<Array<ItemEntity>> {
    return await this.itemsRepository.find({
      where: { user },
      relations: [`photos`, `item_category`, `trade_category`],
    });
  }
}
