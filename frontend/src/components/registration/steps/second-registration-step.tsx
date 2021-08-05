import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { RegistrationContext } from '#components/registration/registration';
import { RegistrationInput } from '#components/registration/registration-input';
import { SecondStepData } from '#components/registration/dto/second-registration-step.dto';
import { RegistrationPhotoInput } from '../registration-photo-input';

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
    <>
      <h1 className={`uk-card-title`}>Регистрация</h1>
      <div className={`uk-flex uk-flex-column uk-flex-middle`}>
        <form id={`user-info-form`} onSubmit={onSubmit}>
          <RegistrationInput
            name={`firstName`}
            placeholder={`Вася`}
            icon={`user`}
            isRequired={true}
            register={register}
            errors={errors}
          />

          <RegistrationInput
            name={`phone`}
            type={`tel`}
            placeholder={`8005553535`}
            icon={`phone`}
            isRequired={true}
            register={register}
            errors={errors}
          />

          <RegistrationInput
            name={`birthday`}
            type={`date`}
            placeholder={``}
            icon={`lock`}
            isRequired={true}
            register={register}
            errors={errors}
          />
        </form>

        <RegistrationPhotoInput />
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
          <button form={`user-info-form`} className={`uk-button uk-button-primary uk-width-1-1`}
                  type={`submit`}>
            Далее &gt;
          </button>
        </div>
      </div>
    </>
  );
};

