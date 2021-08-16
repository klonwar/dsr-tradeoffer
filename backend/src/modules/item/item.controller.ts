import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from '#src/modules/item/item.service';
import { Roles } from '#src/modules/auth/decorators/roles.decorator';
import { UserRole } from '#server/common/enums/user-role.enum';
import { RolesGuard } from '#src/modules/auth/guards/roles.guard';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';

@UseGuards(RolesGuard)
@Controller(`item`)
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get(`:itemId`)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  async getItem(
    @Param(`itemId`, ParseIntPipe) id: number,
  ): Promise<ItemEntity> {
    return await this.itemService.getItem(id);
  }
}
