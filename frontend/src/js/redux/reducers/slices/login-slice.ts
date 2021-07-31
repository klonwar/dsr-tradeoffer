import { createSlice } from '@reduxjs/toolkit';
import { Operations } from '#src/js/redux/operations/operations';
import { LoginOperationResult } from '#src/js/redux/operations/slices/login-operation';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

export const LOGIN_SLICE_NAME = `login`;

export interface LoginState {
  pending: boolean,
  result: LoginOperationResult;
  error: SerializedAxiosError;
}

const initialState: LoginState = {
  pending: false,
  result: null,
  error: null,
};

const loginSlice = createSlice({
  name: LOGIN_SLICE_NAME,
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.pending = false;
      state.result = null;
      state.error = null;
    },
    stateFromStorage: () => {
      const stateFromStorage = JSON.parse(localStorage.getItem(LOGIN_SLICE_NAME));
      if (stateFromStorage)
        return stateFromStorage;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        Operations.login.pending,
        (state) => {
          state.pending = true;
          state.result = null;
          state.error = null;
        },
      )
      .addCase(
        Operations.login.fulfilled,
        (state, action) => {
          state.pending = false;
          state.result = action.payload;
          state.error = null;
        },
      )
      .addCase(
        Operations.login.rejected,
        (state, action) => {
          state.pending = false;
          state.result = null;
          state.error = action.payload;
        },
      );
  },
});

export const LoginActions = loginSlice.actions;

export const loginReducer = loginSlice.reducer;