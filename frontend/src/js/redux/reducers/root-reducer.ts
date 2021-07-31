import { combineReducers } from 'redux';
import { loginReducer } from '#src/js/redux/reducers/slices/login-slice';

const rootReducer = combineReducers({
  loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;