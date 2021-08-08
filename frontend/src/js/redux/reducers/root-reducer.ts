import { combineReducers } from 'redux';
import { userReducer } from '#src/js/redux/reducers/slices/user-slice';
import { itemsReducer } from '#src/js/redux/reducers/slices/items-slice';

const rootReducer = combineReducers({
  userReducer,
  itemsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;