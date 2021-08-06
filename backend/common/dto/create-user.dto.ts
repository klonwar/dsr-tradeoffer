import { IsNotEmpty } from 'class-validator';
import { EditProfileDto } from '#server/common/dto/edit-profile.dto';

export class CreateUserDto extends EditProfileDto {
  @IsNotEmpty({ message: `Нужно указать логин` })
  username: string;
}
