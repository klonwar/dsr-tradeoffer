import { IsOptional } from 'class-validator';
import { Match } from '#server/common/validators/validator-extend-match-decorator';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { RegistrationContext } from '#components/registration/registration';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { RegistrationInput } from '#components/registration/registration-input';

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
  photoPath;

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
        <RegistrationInput
          name={`username`}
          placeholder={`bradeazy`}
          icon={`user`}
          isRequired={true}
          register={register}
          errors={errors}
        />

        <RegistrationInput
          name={`email`}
          type={`email`}
          placeholder={`your@gmail.com`}
          icon={`mail`}
          isRequired={true}
          register={register}
          errors={errors}
        />

        <RegistrationInput
          name={`password`}
          type={`password`}
          icon={`lock`}
          placeholder={`12345678`}
          isRequired={true}
          register={register}
          errors={errors}
        />

        <RegistrationInput
          name={`passwordConfirmation`}
          type={`password`}
          icon={`lock`}
          placeholder={`12345678`}
          isRequired={true}
          register={register}
          errors={errors}
        />
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

