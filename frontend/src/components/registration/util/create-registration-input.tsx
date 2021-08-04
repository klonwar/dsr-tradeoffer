import { FieldErrors, FieldPath } from 'react-hook-form';
import React from 'react';
import InputHint from '#components/input-hint/input-hint';
import { keyToLabelText } from '#components/registration/util/key-to-label-text';
import { CreateUserDto } from '#client/../backend/common/dto/create-user.dto';

interface CreateInputPropsInterface<T> {
  name: FieldPath<CreateUserDto> | `passwordConfirmation`,
  type?: string,
  icon: string,
  placeholder: string,
  isRequired?: boolean,
  register: (...rest: any) => any,
  errors: FieldErrors<T>,
}

export const createRegistrationInput = <T extends unknown>({
                                                             name,
                                                             type = `text`,
                                                             icon,
                                                             placeholder,
                                                             isRequired = false,
                                                             register,
                                                             errors,

                                                           }: CreateInputPropsInterface<T>): React.ReactNode => (
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