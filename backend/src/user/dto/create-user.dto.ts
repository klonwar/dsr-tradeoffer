import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  firstName?: string;

  @IsNotEmpty()
  @Length(10)
  phone?: string;

  @IsNotEmpty()
  @IsDateString({ strict: false })
  birthday?: string;

  photo?: string;
}
