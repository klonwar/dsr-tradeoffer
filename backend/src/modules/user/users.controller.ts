import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '#src/modules/user/users.service';
import { UserDto } from '#server/common/dto/user.dto';
import { Public } from '#src/modules/auth/decorators/public.decorator';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';
import { JwtDto } from '#server/common/dto/jwt.dto';
import { PhotoInterceptor } from '#src/modules/auth/interceptors/photo-interceptor';
import { ChangePasswordDto } from '#server/common/dto/change-password.dto';
import { ErrorMessagesEnum } from '#server/common/enums/error-messages.enum';

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

  @Put(`set_photo`)
  @UseInterceptors(PhotoInterceptor(`photo`))
  async setPhoto(
    @Request() req,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<JwtDto> {
    if (!photo)
      throw new BadRequestException(ErrorMessagesEnum.PHOTO_IS_REQUIRED);

    return await this.usersService.setPhoto(req.user, photo.path);
  }

  @Put(`change_password`)
  async changePassword(
    @Request() req,
    @Body() body: ChangePasswordDto,
  ): Promise<JwtDto> {
    return await this.usersService.changePassword(req.user, body);
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
