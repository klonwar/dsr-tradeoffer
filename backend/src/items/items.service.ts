import { Injectable } from '@nestjs/common';
import { User } from '#src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/items/entity/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { PhotoEntity } from '#src/photos/entity/photo.entity';
import { CategoryEntity } from '#src/items/entity/category.entity';

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
    const photos: PhotoEntity[] = [];

    body.photosPaths?.map((photo_path) => {
      photos.push(
        this.photoRepository.create({
          photo_path,
        }),
      );
    });

    const newItem = this.itemRepository.create({
      ...body,
      user,
      photos,
    });

    const savedItem = await this.itemRepository.save(newItem);

    console.log(savedItem);

    return await this.getAllUserItems(user);
  }

  async removeItem(user: User, id: number): Promise<Array<ItemEntity>> {
    const targetItem = await this.itemRepository.find({ where: { user, id } });

    if (targetItem) {
      await this.itemRepository.delete(id);
    }

    return await this.getAllUserItems(user);
  }
}
