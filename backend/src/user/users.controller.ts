import { Controller, Get } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import { User } from '#src/user/user.entity';

@Controller(`user`)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
