import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';
import { UsersService } from '#src/user/users.service';
import { UserDto } from '#server/common/dto/user.dto';
import { Public } from '#src/auth/decorators/public.decorator';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';
import { JwtDto } from '#server/common/dto/jwt.dto';

@Controller(`user`)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Put(`edit_profile`)
  async editProfile(
    @Request() req,
    @Body() body: EditProfileDto,
  ): Promise<JwtDto> {
    return await this.usersService.editProfile(req.user, body);
  }

  @Public()
  @Get(`is_user_already_exist/:username`)
  async isUsernameExist(@Param(`username`) username: string): Promise<boolean> {
    return !!(await this.usersService.findOneByUsername(username));
  }

  @Public()
  @Get(`is_email_already_exist/:email`)
  async isEmailExist(@Param(`email`) email: string): Promise<boolean> {
    return !!(await this.usersService.findOneByEmail(email));
  }
}
