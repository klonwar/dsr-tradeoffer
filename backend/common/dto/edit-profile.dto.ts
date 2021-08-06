import { CreateUserDto } from '#server/common/dto/create-user.dto';
import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { MaxDateString } from '#server/common/validators/validator-extend-max-date-string-decorator';
import { IsPhotoPath } from '#server/common/validators/validator-extend-is-photo-path';

const get18yoDate = () => {
  const targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() - 18);
  return targetDate;
};

export class EditProfileDto {
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

  @MaxDateString(new Date(), { message: `Введите корректную дату рождения` })
  @MaxDateString(get18yoDate(), { message: `Вам должно быть 18 лет` })
  @IsDateString({ strict: false }, { message: `Неверный формат даты` })
  @IsNotEmpty({ message: `Нужно указать дату рождения` })
  birthday: string;

  @IsPhotoPath()
  @IsOptional()
  photoPath?: string;
}
