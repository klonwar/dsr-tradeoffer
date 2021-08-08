import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ItemsService } from '#src/items/items.service';
import { ItemEntity } from '#src/items/entity/item.entity';

@Controller(`items`)
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUserItems(@Request() req): Promise<Array<ItemEntity>> {
    return await this.itemsService.getAllUserItems(req.user);
  }
}
