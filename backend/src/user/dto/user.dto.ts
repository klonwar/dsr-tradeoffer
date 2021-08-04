import { IsDateString, IsEmail, IsNotEmpty, Length } from 'class-validator';
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
  @Length(10)
  phone: string;

  @IsNotEmpty()
  @IsDateString({ strict: false })
  birthday: string;

  photo?: string;
}
