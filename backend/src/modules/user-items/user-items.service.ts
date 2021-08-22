import { Injectable } from '@nestjs/common';
import { User } from '#src/modules/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { Repository } from 'typeorm';
import { UserRole } from '#server/common/enums/user-role.enum';

@Injectable()
export class UserItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async getItemsList(user: User): Promise<Array<ItemEntity>> {
    if (user.role === UserRole.ADMIN)
      return await this.itemRepository.find({
        relations: [`photos`, `item_category`, `trade_category`, `user`],
      });

    return await this.itemRepository.find({
      where: { user },
      relations: [`photos`, `item_category`, `trade_category`, `user`],
    });
  }
}
