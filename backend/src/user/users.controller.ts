import { Controller, Get } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import { UserDto } from '#src/user/dto/user.dto';

@Controller(`user`)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }
}
