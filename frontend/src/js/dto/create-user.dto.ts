import { IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: `Нужно указать логин` })
  username: string;

  @MinLength(8, { message: `Нужно ввести >= $constraint1 символов` })
  @IsNotEmpty({ message: `Нужно указать пароль` })
  password: string;

  @IsNotEmpty({ message: `Нужно указать имя` })
  firstName: string;

  @IsEmail(undefined, { message: `Некорректный email` })
  email: string;

  @IsMobilePhone(`ru-RU`, { strictMode: false }, { message: `Неверный формат` })
  @Matches(/^[0-9]{10}$/, { message: `Введите 10 символов без кода страны` })
  @IsNotEmpty({ message: `Нужно указать номер` })
  phone: string;

  @IsDateString({ strict: false }, { message: `Неверный формат` })
  @IsNotEmpty({ message: `Нужно указать дату рождения` })
  birthday: string;

  @Matches(/^[^\n]+\.((png)|(jp[e]?g))$/, { message: `Фотография должна быть .png или .jpg/.jpeg` })
  @IsOptional()
  photo?: string;
}
