import { createSelector, Selector } from 'reselect';
import { RootState } from '#src/js/redux/reducers/root-reducer';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { UserDto } from '#server/common/dto/user.dto';
import jwtDecode from 'jwt-decode';
import { ItemsListDto } from '#server/common/dto/items-list.dto';

interface AppSelector<T> extends Selector<RootState, T> {}

export const isUserRequestPendingSelector: AppSelector<boolean> = (state) => state.userReducer.pending;

export const jwtTokenSelector: AppSelector<string> = (state) => state.userReducer.result?.access_token;

export const userRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.userReducer.error;

export const isAuthorizedSelector = createSelector<RootState, string, boolean>(
  jwtTokenSelector,
  (res) => !!res,
);

export const userDataSelector = createSelector<RootState, string, UserDto>(
  jwtTokenSelector,
  (jwtToken) => (jwtToken) ? jwtDecode(jwtToken) as UserDto : undefined,
);

export const userPhotoUrlSelector = createSelector<RootState, UserDto, string>(
  userDataSelector,
  (userData) => (userData?.photoPath)
    ? `${process.env[`SERVER_ORIGIN`]}/${userData.photoPath.replace(/\\/, `/`)}`
    : undefined,
);

export const isItemsRequestPendingSelector: AppSelector<boolean> = (state) => state.itemsReducer.pending;

export const itemsListSelector: AppSelector<ItemsListDto> = (state) => state.itemsReducer.result;

export const itemsErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.itemsReducer.error;
