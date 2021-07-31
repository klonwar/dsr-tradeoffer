import { combineReducers } from 'redux';
import { userReducer } from '#src/js/redux/reducers/slices/login-slice';

const rootReducer = combineReducers({
  loginReducer: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;