import React from 'react';
import { keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#reusable/forms/input-hint/input-hint';
import { FieldErrors, FieldPath } from 'react-hook-form';
import { CreateUserDto } from '#server/common/dto/create-user.dto';

interface RegistrationInputPropsInterface<T> {
  name: FieldPath<CreateUserDto> | `passwordConfirmation`,
  type?: string,
  icon: string,
  placeholder: string,
  isRequired?: boolean,
  register: (...rest: any) => any,
  errors: FieldErrors<T>,
}

export const RegistrationInput = <T extends unknown>(props: RegistrationInputPropsInterface<T>): JSX.Element => {
  const {
    name,
    type = `text`,
    icon,
    placeholder,
    isRequired = false,
    register,
    errors,

  } = props;
  return (
    <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
      <div className='uk-flex uk-form-label'>
        <span>{keyToLabelText.get(name) ?? `unknown`}</span>
        {(isRequired) ? <span className={`RedAsterisk`}>*</span> : null}
      </div>
      <div className={`uk-position-relative`}>
        <span className={`uk-form-icon`} uk-icon={`icon: ${icon}`} />
        <input
          type={type}
          className={`uk-input${(errors[name]) ? ` uk-form-danger` : ``}`}
          placeholder={placeholder}
          {...register(name)}
        />
        <InputHint
          text={errors[name]?.message}
          className={`uk-position-center-right-out`}
          isActive={!!errors[name]}
        />
      </div>
    </div>
  );
};