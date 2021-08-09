import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { FieldPath } from 'react-hook-form';

export type CreateUserDtoKeyWithPwdConfirmation = FieldPath<CreateUserDto> | `passwordConfirmation`

export const keyToLabelText = new Map<CreateUserDtoKeyWithPwdConfirmation, string>();
keyToLabelText.set(`username`, `Имя пользователя`);
keyToLabelText.set(`email`, `Почта`);
keyToLabelText.set(`password`, `Пароль`);
keyToLabelText.set(`passwordConfirmation`, `Подтверждение пароля`);
keyToLabelText.set(`firstName`, `Ваше имя`);
keyToLabelText.set(`phone`, `Телефон`);
keyToLabelText.set(`birthday`, `Дата рождения`);
keyToLabelText.set(`photoPath`, `Фотография`);