import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '#src/user/entity/user.entity';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  role: UserRole;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  birthday: string;

  photoPath?: string;
}
