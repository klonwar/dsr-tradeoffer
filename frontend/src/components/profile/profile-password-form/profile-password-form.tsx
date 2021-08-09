import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputHint from '#components/_reusable/forms/input-hint/input-hint';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';
import { useShowUserRequestError } from '#src/js/hooks/use-show-user-request-error';
import { isUserRequestPendingSelector, userDataSelector } from '#src/js/redux/selectors';
import { useSelector } from 'react-redux';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ChangePasswordDto } from '#server/common/dto/change-password.dto';

export const ProfilePasswordForm: FC = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(userDataSelector);
  const isPending = useSelector(isUserRequestPendingSelector);

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<ChangePasswordDto>({
    resolver: classValidatorResolver(ChangePasswordDto)
  });
  const [isOpened, setIsOpened] = useState(false);

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.changePassword(data));
  });

  useShowUserRequestError(isSubmitSuccessful);

  useEffect(() => {
    if (userData) {
      setIsOpened(false);
    }
  }, [userData]);

  if (!isOpened) {
    return (
      <button className={`uk-width-1-1 uk-button uk-button-default`}
              onClick={() => setIsOpened(true)}>Изменить пароль
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`uk-inline uk-width-expand `}>
        <div className={`uk-position-relative uk-flex uk-flex-column`}>
          <div className={`uk-width-expand uk-inline uk-margin-small-bottom`}>
            <span className={`uk-form-icon`} uk-icon={`icon: unlock`}/>
            <input
              {...register(`oldPassword`)}
              type={`password`}
              className={`uk-input`}
              placeholder={`Старый пароль`}
            />
            <InputHint
              text={errors.oldPassword?.message}
              className={`uk-position-center-right-out`}
              isActive={!!errors.oldPassword}
            />
          </div>
          <div className={`uk-width-expand uk-inline uk-margin-small-bottom`}>
            <span className={`uk-form-icon`} uk-icon={`icon: lock`}/>
            <input
              {...register(`newPassword`)}
              type={`password`}
              className={`uk-input`}
              placeholder={`Новый пароль`}
            />
            <InputHint
              text={errors.newPassword?.message}
              className={`uk-position-center-right-out`}
              isActive={!!errors.newPassword}
            />
          </div>
          <div className={`uk-width-expand uk-inline uk-margin-small-bottom`}>
            <span className={`uk-form-icon`} uk-icon={`icon: lock`}/>
            <input
              {...register(`newPasswordConfirmation`)}
              type={`password`}
              className={`uk-input`}
              placeholder={`Подтверждение пароля`}
            />
            <InputHint
              text={errors.newPasswordConfirmation?.message}
              className={`uk-position-center-right-out`}
              isActive={!!errors.newPasswordConfirmation}
            />
          </div>
          <button type={`submit`}
                  className={`uk-button uk-button-primary`}
                  disabled={isPending} >
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
};
