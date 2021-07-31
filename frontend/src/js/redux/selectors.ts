import { createSelector, Selector } from 'reselect';
import { RootState } from '#src/js/redux/reducers/root-reducer';
import { LoginOperationResult } from '#src/js/redux/operations/slices/login-operation';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

interface AppSelector<T> extends Selector<RootState, T> {}

export const isLoginPendingSelector: AppSelector<boolean> = (state) => state.loginReducer.pending;

export const loginResultSelector: AppSelector<LoginOperationResult> = (state) => state.loginReducer.result;

export const loginErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.loginReducer.error;

export const isLoginSuccessfulSelector = createSelector<RootState, LoginOperationResult, SerializedAxiosError, boolean | undefined>(
  loginResultSelector,
  loginErrorSelector,
  (loginResult, loginError) => {
    if (loginResult)
      return true;

    if (loginError)
      return false;

    return undefined;
  },
);

export const isAuthorizedSelector = createSelector<RootState, LoginOperationResult, boolean>(
  loginResultSelector,
  (res) => !!res,
);