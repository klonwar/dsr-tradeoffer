import { createSelector, Selector } from 'reselect';
import { RootState } from '#redux/reducers/root-reducer';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { UserDto } from '#server/common/dto/user.dto';
import jwtDecode from 'jwt-decode';
import { CategoriesListDto } from '#server/common/dto/categories-list.dto';
import { srcFromPhotoPath } from '#src/js/util/src-from-photo-path';
import { UserRole } from '#server/common/enums/user-role.enum';
import { AccountsListDto } from '#server/common/dto/accounts-list.dto';
import { CatalogueResult } from '#redux/reducers/slices/catalogue-slice';
import { ItemDto } from '#server/common/dto/item.dto';
import { AppPaginationMeta } from '#server/common/classes/pagination';
import { ItemsResult } from '#redux/reducers/slices/user-items-slice';

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

export const isAdminSelector = createSelector<RootState, UserDto, boolean>(
  userDataSelector,
  (userData) => userData?.role && userData.role === UserRole.ADMIN,
);

export const isUserSelector = createSelector<RootState, UserDto, boolean>(
  userDataSelector,
  (userData) => userData?.role && userData.role === UserRole.USER,
);

export const userPhotoUrlSelector = createSelector<RootState, UserDto, string>(
  userDataSelector,
  (userData) => (userData?.photoPath)
    ? srcFromPhotoPath(userData.photoPath)
    : undefined,
);

export const isItemsRequestPendingSelector: AppSelector<boolean> = (state) => state.userItemsReducer.pending;

export const itemsResultSelector: AppSelector<ItemsResult> = (state) => state.userItemsReducer.result;

export const itemsCurrentMetaSelector = createSelector<RootState, ItemsResult, AppPaginationMeta>(
  itemsResultSelector,
  (catalogueResult) => catalogueResult.currentMeta,
);

export const itemsListSelector = createSelector<RootState, ItemsResult, Array<ItemDto>>(
  itemsResultSelector,
  (itemsResult) => {
    const items: Array<ItemDto> = [];
    for (const page of Object.values(itemsResult.pages)) {
      items.push(...page.items);
    }
    return items;
  },
);


export const itemsRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.userItemsReducer.error;

export const isCategoriesRequestPendingSelector: AppSelector<boolean> = (state) => state.categoriesReducer.pending;

export const categoriesListSelector: AppSelector<CategoriesListDto> = (state) => state.categoriesReducer.result;

export const categoriesRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.categoriesReducer.error;

export const isAccountsRequestPendingSelector: AppSelector<boolean> = (state) => state.accountsReducer.pending;

export const accountsListSelector: AppSelector<AccountsListDto> = (state) => state.accountsReducer.result;

export const accountsRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.accountsReducer.error;

export const isCatalogueRequestPendingSelector: AppSelector<boolean> = (state) => state.catalogueReducer.pending;

export const catalogueResultSelector: AppSelector<CatalogueResult> = (state) => state.catalogueReducer.result;

export const catalogueCurrentMetaSelector = createSelector<RootState, CatalogueResult, AppPaginationMeta>(
  catalogueResultSelector,
  (catalogueResult) => catalogueResult.currentMeta,
);

export const catalogueItemsSelector = createSelector<RootState, CatalogueResult, Array<ItemDto>>(
  catalogueResultSelector,
  (catalogueResult) => {
    const items: Array<ItemDto> = [];
    for (const page of Object.values(catalogueResult.pages)) {
      items.push(...page.items);
    }
    return items;
  },
);

export const catalogueRequestErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.catalogueReducer.error;

export const isCurrentItemRequestPendingSelector: AppSelector<boolean> = (state) => state.itemReducer.pending;
export const currentItemSelector: AppSelector<ItemDto> = (state) => state.itemReducer.result;
export const currentItemErrorSelector: AppSelector<SerializedAxiosError> = (state) => state.itemReducer.error;