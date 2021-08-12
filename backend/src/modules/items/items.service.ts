import { Injectable } from '@nestjs/common';
import { User } from '#src/modules/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/modules/items/entity/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { PhotoEntity } from '#src/modules/photos/entity/photo.entity';
import { CategoryEntity } from '#src/modules/items/entity/category.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    @InjectRepository(PhotoEntity)
    private photoRepository: Repository<PhotoEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllUserItems(user: User): Promise<Array<ItemEntity>> {
    return await this.itemRepository.find({
      where: { user },
      relations: [`photos`, `item_category`, `trade_category`],
    });
  }

  async createItem(
    user: User,
    body: CreateItemDto,
  ): Promise<Array<ItemEntity>> {
    const photos: PhotoEntity[] =
      body.photosPaths?.map((photo_path) =>
        this.photoRepository.create({
          photo_path,
        }),
      ) ?? [];

    const newItem = this.itemRepository.create({
      ...body,
      user,
      photos,
    });

    await this.itemRepository.save(newItem);

    return await this.getAllUserItems(user);
  }

  async removeItem(user: User, id: number): Promise<Array<ItemEntity>> {
    const targetItem = await this.itemRepository.find({ where: { user, id } });

    if (targetItem) {
      await this.itemRepository.delete(id);
    }

    return await this.getAllUserItems(user);
  }

  async getCategories(): Promise<Array<CategoryEntity>> {
    return await this.categoryRepository.find();
  }
}
