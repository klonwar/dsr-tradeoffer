import { combineReducers } from 'redux';
import { userReducer } from '#redux/reducers/slices/user-slice';
import { itemsReducer } from '#redux/reducers/slices/items-slice';
import { categoriesReducer } from '#redux/reducers/slices/categories-slice';

const rootReducer = combineReducers({
  userReducer,
  itemsReducer,
  categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;