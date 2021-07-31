import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsNotEmpty, MinLength } from 'class-validator';
import InputHint from '#components/input-hint/input-hint';
import { useAppDispatch } from '#src/js/redux/store';
import { Operations } from '#src/js/redux/operations/operations';
import { isAuthorizedSelector, isLoginPendingSelector, loginErrorSelector } from '#src/js/redux/selectors';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import UIkit from 'uikit';

export class UserFormData {
  @IsNotEmpty()
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isAuthorized = useSelector(isAuthorizedSelector);

  useEffect(() => {
    if (isAuthorized) {
      history.replace(`/`);
    }
  }, [history, isAuthorized]);

  const isPending = useSelector(isLoginPendingSelector);
  const loginError = useSelector(loginErrorSelector);

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: classValidatorResolver(UserFormData),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(Operations.login(data));
  });

  useEffect(() => {
    if (loginError) {
      const codeToMessage = new Map();
      codeToMessage.set(`401`, `Данные неверны`);

      UIkit.notification({
        message: (loginError.code)
          ? codeToMessage.get(loginError.code) ?? loginError.message
          : loginError.message,
        pos: `bottom-right`,
      });
    }
  }, [loginError]);

  return (
    <div className={`uk-flex uk-flex-center uk-flex-middle uk-width-1-1 uk-height-1-1`}>
      <form onSubmit={onSubmit} className={`uk-card uk-card-default uk-card-body`}>
        <h1 className={`uk-card-title`}>Войти</h1>
        <div className={`uk-flex uk-flex-column uk-flex-middle`} uk-margin={``}>
          <div className={`uk-inline`}>
            <span className={`uk-form-icon`} uk-icon={`icon: user`} />
            <input
              className={`uk-input${(errors.username) ? ` uk-form-danger` : ``}`}
              placeholder={`Логин`}
              {...register(`username`)}
            />
            <InputHint
              text={
                (errors.username?.type === `isNotEmpty`)
                  ? `Введите логин`
                  : ``
              }
              className={`uk-position-center-right-out`}
              isActive={!!errors.username}
            />
          </div>
          <div className={`uk-inline`}>
            <span className={`uk-form-icon`} uk-icon={`icon: lock`} />
            <input
              className={`uk-input${(errors.password) ? ` uk-form-danger` : ``}`}
              type={`password`}
              placeholder={`Пароль`}
              {...register(`password`)}
            />
            <InputHint
              text={
                (errors.password?.type === `isNotEmpty`)
                  ? `Введите пароль`
                  : (errors.password?.type === `minLength`)
                    ? `Количество символов должно быть >= 8`
                    : ``
              }
              className={`uk-position-center-right-out`}
              isActive={!!errors.password}
            />
          </div>
        </div>
        <button disabled={isPending} className={`uk-button uk-button-primary uk-width-1-1 uk-margin`}
                type={`submit`}>Войти
        </button>
      </form>
    </div>
  );
};

export default Login;