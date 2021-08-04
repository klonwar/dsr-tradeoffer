import React, { FC, useContext, useEffect } from 'react';
import { RegistrationContext } from '#components/registration/registration';
import { FieldPath, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { isUserRequestPendingSelector, userRequestErrorSelector } from '#src/js/redux/selectors';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { CreateUserDto } from '#server/common/dto/create-user.dto';
import UIkit from 'uikit';

export const ThirdRegistrationStep: FC<{ prev: () => void }> = ({ prev }) => {
  const dispatch = useAppDispatch();
  const isPending = useSelector(isUserRequestPendingSelector);
  const registrationError = useSelector(userRequestErrorSelector);

  const { registrationState } = useContext(RegistrationContext);
  const { handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm<CreateUserDto>({
    resolver: classValidatorResolver(CreateUserDto),
  });

  useEffect(() => {
    if (registrationState) {
      for (const [key, value] of Object.entries(registrationState)) {
        const fieldPathKey = key as FieldPath<CreateUserDto>;
        setValue(fieldPathKey, value);
      }
    }
  }, [registrationState, setValue]);

  useEffect(() => {
    if (isSubmitted && registrationError) {
      UIkit.notification({
        message: registrationError.message,
        pos: `bottom-right`,
      });
    }
  }, [registrationError, isSubmitted]);

  return (
    <form onSubmit={handleSubmit((data) => {
      dispatch(Operations.registration(data));
    })}>
      <h1 className={`uk-card-title`}>Все верно?</h1>
      <div className={`uk-flex uk-flex-column uk-flex-middle`}>
        <pre>
          {JSON.stringify(registrationState, null, 2)}
        </pre>
      </div>
      {(errors) ? (
        <div className={`uk-flex uk-flex-column uk-flex-middle`}>
          <pre>
            {JSON.stringify(errors, null, 2)}
          </pre>
        </div>
      ) : null}
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
                  type={`submit`} disabled={isPending}>
            Верно
          </button>
        </div>
      </div>
    </form>
  );
};