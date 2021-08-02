import { combineReducers } from 'redux';
import { userReducer } from '#src/js/redux/reducers/slices/user-slice';

const rootReducer = combineReducers({
  userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;