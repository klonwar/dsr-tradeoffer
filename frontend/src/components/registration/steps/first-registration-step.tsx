import { IsOptional } from 'class-validator';
import { Match } from '#src/js/class-validator/validator-extend-match-decorator';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { createRegistrationInput } from '#components/registration/util/create-registration-input';
import { RegistrationContext } from '#components/registration/registration';
import { CreateUserDto } from '#src/js/dto/create-user.dto';

class FirstStepData extends CreateUserDto {

  @Match(FirstStepData, (s) => s.password, { message: `Пароли не совпадают` })
  passwordConfirmation;

  @IsOptional()
  firstName;
  @IsOptional()
  phone;
  @IsOptional()
  birthday;
  @IsOptional()
  photo;

}

export const FirstRegistrationStep: FC<{ next: () => void }> = ({ next }) => {
  const { appendToState } = useContext(RegistrationContext);
  const { register, formState: { errors }, handleSubmit } = useForm<FirstStepData>({
    resolver: classValidatorResolver(FirstStepData),
    mode: `onTouched`,
  });

  const onSubmit = handleSubmit((data) => {
    appendToState(data);
    next();
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className={`uk-card-title`}>Регистрация</h1>
      <div className={`uk-flex uk-flex-column uk-flex-middle`}>

        {
          createRegistrationInput<FirstStepData>({
            name: `username`,
            label: `Имя пользователя`,
            placeholder: `bradeazy`,
            icon: `user`,
            isRequired: true,
            register,
            errors,
          })
        }

        {
          createRegistrationInput<FirstStepData>({
            name: `email`,
            label: `Почта`,
            type: `email`,
            placeholder: `your@gmail.com`,
            icon: `mail`,
            isRequired: true,
            register,
            errors,
          })
        }

        {
          createRegistrationInput<FirstStepData>({
            name: `password`,
            label: `Пароль`,
            type: `password`,
            placeholder: `12345678`,
            icon: `lock`,
            isRequired: true,
            register,
            errors,
          })
        }

        {
          createRegistrationInput<FirstStepData>({
            name: `passwordConfirmation`,
            label: `Подтверждение пароля`,
            type: `password`,
            placeholder: `12345678`,
            icon: `lock`,
            isRequired: true,
            register,
            errors,
          })
        }
      </div>
      <div className={`uk-child-width-expand uk-margin uk-margin-remove-bottom`} uk-grid={``}>
        <div>
          <button className={`uk-button uk-button-primary uk-width-1-1`}
                  type={`submit`}>
            Далее &gt;
          </button>
        </div>
      </div>

    </form>
  );
};

