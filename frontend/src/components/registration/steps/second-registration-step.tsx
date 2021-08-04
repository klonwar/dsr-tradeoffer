import { IsOptional } from 'class-validator';
import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { createRegistrationInput } from '#components/registration/util/create-registration-input';
import InputHint from '#components/input-hint/input-hint';
import { RegistrationContext } from '#components/registration/registration';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import { keyToLabelText } from '#components/registration/util/key-to-label-text';

export class SecondStepData extends CreateUserDto {
  @IsOptional()
  username;

  @IsOptional()
  password;

  @IsOptional()
  email;
}

// todo

const getPhotoInput = (register, errors) => (
  <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
    <div className='uk-flex uk-form-label'>
      <span>{keyToLabelText.get(`photo`)}</span>
    </div>
    <div className={`uk-position-relative`}>
      <div className={`uk-flex`} uk-form-custom={`target: true`}>
        <input type={`file`} {...register(`photo`)} />
        <input
          type={`text`}
          className={`uk-width-expand uk-input${(errors.photo) ? ` uk-form-danger` : ``}`}
          placeholder={`Выбрать файл`}
          disabled={true}
          style={{ marginRight: `5px` }}
        />
        <InputHint
          text={errors.photo?.message}
          className={`uk-position-center-right-out`}
          isActive={!!errors.photo}
        />
        <a href={`#`} className={`uk-button uk-button-default`}>Загрузить</a>
      </div>
    </div>
  </div>
);

export const SecondRegistrationStep: FC<{ next: () => void, prev: () => void }> = ({ next, prev }) => {
  const { appendToState } = useContext(RegistrationContext);
  const { register, formState: { errors }, handleSubmit } = useForm<SecondStepData>({
    resolver: classValidatorResolver(SecondStepData),
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
          createRegistrationInput<SecondStepData>({
            name: `firstName`,
            placeholder: `Вася`,
            icon: `user`,
            isRequired: true,
            register,
            errors,
          })
        }

        {
          createRegistrationInput<SecondStepData>({
            name: `phone`,
            type: `tel`,
            placeholder: `(800)-555-35-35`,
            icon: `phone`,
            isRequired: true,
            register,
            errors,
          })
        }

        {
          createRegistrationInput<SecondStepData>({
            name: `birthday`,
            type: `date`,
            placeholder: ``,
            icon: `lock`,
            isRequired: true,
            register,
            errors,
          })
        }

        {/* todo getPhotoInput(register, errors) */}

      </div>
      <div className={`uk-child-width-expand uk-margin  uk-margin-remove-bottom`} uk-grid={``}>
        <div>
          <a href={`#`} className={`uk-button uk-button-default uk-width-1-1`}
             onClick={(e) => {
               e.preventDefault();
               prev();
             }}>
            &lt; Назад
          </a>
        </div>
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

