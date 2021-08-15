import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '#src/modules/auth/guards/roles.guard';
import { Roles } from '#src/modules/auth/decorators/roles.decorator';
import { UserRole } from '#server/common/enums/user-role.enum';
import { UserDto } from '#server/common/dto/user.dto';
import { AccountsService } from '#src/accounts/accounts.service';

@UseGuards(RolesGuard)
@Controller(`accounts`)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(): Promise<UserDto[]> {
    return await this.accountsService.findAll();
  }

  @Delete(`/:id`)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param(`id`, ParseIntPipe) id: number): Promise<UserDto[]> {
    return await this.accountsService.deleteUser(id);
  }
}
