import { combineReducers } from 'redux';
import { userReducer } from '#redux/reducers/slices/user-slice';
import { itemsReducer } from '#redux/reducers/slices/items-slice';
import { categoriesReducer } from '#redux/reducers/slices/categories-slice';
import { accountsReducer } from '#redux/reducers/slices/accounts-slice';
import { catalogueReducer } from '#redux/reducers/slices/catalogue-slice';

const rootReducer = combineReducers({
  userReducer,
  itemsReducer,
  categoriesReducer,
  accountsReducer,
  catalogueReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;