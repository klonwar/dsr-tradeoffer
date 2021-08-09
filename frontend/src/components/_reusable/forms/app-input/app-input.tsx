import React from 'react';
import { AvailableTranslations, keyToLabelText } from '#src/js/util/key-to-label-text';
import InputHint from '#reusable/forms/input-hint/input-hint';
import { FieldErrors } from 'react-hook-form';

interface UseFormFunctions {
  register: (...rest: any) => any,
  errors: FieldErrors,
}

interface AppInputOptions {
  icon?: string,
  isRequired?: boolean,
  withLabel?: boolean,
}

interface AppInputPropsInterface {
  name: AvailableTranslations,
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  options?: AppInputOptions,
  useForm: UseFormFunctions
}

export const AppInput = (props: AppInputPropsInterface): JSX.Element => {
  const {
    name,
    inputProps: {
      className,
      ...restInputProps
    } = {},
    options: {
      icon,
      isRequired = false,
      withLabel = true,
    } = {},
    useForm: {
      register,
      errors,
    },
  } = props;
  return (
    <div className={`uk-inline uk-width-expand uk-margin-small uk-margin-remove-top`}>
      {(withLabel) ? (
        <div className='uk-flex uk-form-label'>
          <span>{keyToLabelText.get(name) ?? `unknown`}</span>
          {(isRequired) ? <span className={`RedAsterisk`}>*</span> : null}
        </div>
      ) : null}
      <div className={`uk-position-relative`}>
        {(icon) ? (
          <span className={`uk-form-icon`} uk-icon={`icon: ${icon}`} />
        ) : null}
        <input
          className={`uk-input${(errors[name]) ? ` uk-form-danger` : ``} ${className}`}
          {...restInputProps}
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