import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { Match } from '#server/common/validators/validator-extend-match-decorator';
import { IsOptional } from 'class-validator';

export class FirstStepData extends CreateUserDto {
  @Match(FirstStepData, (s) => s.password, { message: `Пароли не совпадают` })
  passwordConfirmation;

  @IsOptional()
  firstName;
  @IsOptional()
  phone;
  @IsOptional()
  birthday;
  @IsOptional()
  photoPath;

}