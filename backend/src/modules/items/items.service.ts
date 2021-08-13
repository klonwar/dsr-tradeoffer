import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '#src/modules/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '#src/modules/items/entity/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { PhotoEntity } from '#src/modules/photos/entity/photo.entity';
import { CategoryEntity } from '#src/modules/items/entity/category.entity';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';
import { EditItemDto } from '#server/common/dto/edit-item.dto';

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
    const { item_category_id, trade_category_id } = body;

    if (
      !(await this.categoryRepository.findOne(item_category_id)) ||
      !(await this.categoryRepository.findOne(trade_category_id))
    )
      throw new BadRequestException(ErrorMessagesEnum.NO_SUCH_CATEGORY);

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

  async editItem(
    user: User,
    plainEditItemDto: EditItemDto,
  ): Promise<Array<ItemEntity>> {
    const { id, name, geo, description, item_category_id, trade_category_id } =
      plainEditItemDto;

    const item = await this.itemRepository.findOne(id, { relations: [`user`] });

    if (!item) throw new BadRequestException(ErrorMessagesEnum.NO_SUCH_ITEM);

    if (item.user.id !== user.id)
      throw new UnauthorizedException(ErrorMessagesEnum.NOT_YOUR_ITEM);

    if (name) item.name = name;
    if (description) item.description = description;
    if (geo) item.geo = geo;

    if (item_category_id) {
      if (await this.categoryRepository.findOne(item_category_id))
        item.item_category_id = item_category_id;
      else throw new BadRequestException(ErrorMessagesEnum.NO_SUCH_CATEGORY);
    }

    if (trade_category_id) {
      if (await this.categoryRepository.findOne(trade_category_id))
        item.trade_category_id = trade_category_id;
      else throw new BadRequestException(ErrorMessagesEnum.NO_SUCH_CATEGORY);
    }

    await this.itemRepository.save(item);

    return await this.getAllUserItems(user);
  }
}
