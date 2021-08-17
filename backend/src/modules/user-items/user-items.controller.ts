import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserItemsService } from '#src/modules/user-items/user-items.service';
import { ItemEntity } from '#src/modules/user-items/entity/item.entity';
import { RolesGuard } from '#src/modules/auth/guards/roles.guard';
import { Roles } from '#src/modules/auth/decorators/roles.decorator';
import { UserRole } from '#server/common/enums/user-role.enum';

@UseGuards(RolesGuard)
@Controller(`user_items`)
export class UserItemsController {
  constructor(private itemsService: UserItemsService) {}

  @Get()
  @Roles(UserRole.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  async getItemsList(@Request() req): Promise<Array<ItemEntity>> {
    return await this.itemsService.getItemsList(req.user);
  }
}
