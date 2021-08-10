import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from '#src/items/items.service';
import { ItemEntity } from '#src/items/entity/item.entity';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { PhotosInterceptor } from '#src/auth/interceptors/photo-interceptor';
import { DeleteItemDto } from '#server/common/dto/delete-item.dto';

@Controller(`items`)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUserItems(@Request() req): Promise<Array<ItemEntity>> {
    return await this.itemsService.getAllUserItems(req.user);
  }

  @Post(`create`)
  @UseInterceptors(ClassSerializerInterceptor, PhotosInterceptor(`photos`))
  async createItem(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Request() req,
    @Body() body: CreateItemDto,
  ): Promise<Array<ItemEntity>> {
    return await this.itemsService.createItem(req.user, {
      ...body,
      photosPaths: photos?.map((item) => item.path),
    });
  }

  @Post(`delete`)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteItem(@Request() req, @Body() { id }: DeleteItemDto) {
    return await this.itemsService.removeItem(req.user, id);
  }

  @Get(`categories`)
  @UseInterceptors(ClassSerializerInterceptor)
  async getCategories() {
    return await this.itemsService.getCategories();
  }
}
