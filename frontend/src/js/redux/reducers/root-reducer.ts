import { combineReducers } from 'redux';
import { userReducer } from '#redux/reducers/slices/user-slice';
import { userItemsReducer } from '#redux/reducers/slices/user-items-slice';
import { categoriesReducer } from '#redux/reducers/slices/categories-slice';
import { accountsReducer } from '#redux/reducers/slices/accounts-slice';
import { catalogueReducer } from '#redux/reducers/slices/catalogue-slice';
import { itemReducer } from '#redux/reducers/slices/item-slice';

const rootReducer = combineReducers({
  userReducer,
  userItemsReducer,
  categoriesReducer,
  accountsReducer,
  catalogueReducer,
  itemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;