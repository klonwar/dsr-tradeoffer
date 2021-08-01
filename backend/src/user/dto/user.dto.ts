import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UserRole } from '#src/user/entity/user.entity';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  role: UserRole;

  @IsEmail()
  email?: string;

  firstName?: string;

  @Length(10)
  phone?: string;

  birthday?: Date;

  photo?: string;
}
