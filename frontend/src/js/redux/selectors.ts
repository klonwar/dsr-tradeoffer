import { createSelector, Selector } from 'reselect';
import { RootState } from '#src/js/redux/reducers/root-reducer';
import { LoginOperationResult } from '#src/js/redux/operations/slices/login-operation';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

interface AppSelector<T> extends Selector<RootState, T> {}

export const isUserRequestPendingSelector: AppSelector<boolean> = (state) => state.userReducer.pending;

export const userDataSelector: AppSelector<LoginOperationResult> = (state) => state.userReducer.result;

export const userRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.userReducer.error;

export const isLoginSuccessfulSelector = createSelector<RootState, LoginOperationResult, SerializedAxiosError, boolean | undefined>(
  userDataSelector,
  userRequestErrorSelector,
  (loginResult, loginError) => {
    if (loginResult)
      return true;

    if (loginError)
      return false;

    return undefined;
  },
);

export const isAuthorizedSelector = createSelector<RootState, LoginOperationResult, boolean>(
  userDataSelector,
  (res) => !!res,
);