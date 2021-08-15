import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from '#src/modules/items/items.service';
import { ItemEntity } from '#src/modules/items/entity/item.entity';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { PhotosInterceptor } from '#src/modules/auth/interceptors/photo-interceptor';
import { EditItemDto } from '#server/common/dto/edit-item.dto';
import { SetItemPhotosDto } from '#server/common/dto/set-item-photos.dto';
import { RolesGuard } from '#src/modules/auth/guards/roles.guard';
import { Roles } from '#src/modules/auth/decorators/roles.decorator';
import { UserRole } from '#server/common/enums/user-role.enum';

@UseGuards(RolesGuard)
@Controller(`items`)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async getItemsList(@Request() req): Promise<Array<ItemEntity>> {
    return await this.itemsService.getItemsList(req.user);
  }

  @Post(`create`)
  @Roles(UserRole.USER)
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

  @Delete(`/:id`)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteItem(@Request() req, @Param(`id`, ParseIntPipe) id: number) {
    return await this.itemsService.removeItem(req.user, id);
  }

  @Get(`categories`)
  @Roles(UserRole.USER, UserRole.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  async getCategories() {
    return await this.itemsService.getCategories();
  }

  // todo добавление категории админом

  @Put(`edit`)
  @Roles(UserRole.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  async editItem(
    @Request() req,
    @Body() body: EditItemDto,
  ): Promise<Array<ItemEntity>> {
    return await this.itemsService.editItem(req.user, body);
  }

  @Put(`set_photos`)
  @Roles(UserRole.USER)
  @UseInterceptors(ClassSerializerInterceptor, PhotosInterceptor())
  async setItemPhotos(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Request() req,
    @Body() body: SetItemPhotosDto,
  ): Promise<Array<ItemEntity>> {
    return await this.itemsService.setItemPhotos(req.user, photos, body.id);
  }
}
