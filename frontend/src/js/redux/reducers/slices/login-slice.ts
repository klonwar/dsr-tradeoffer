import { createSlice } from '@reduxjs/toolkit';
import { Operations } from '#src/js/redux/operations/operations';
import { LoginOperationResult } from '#src/js/redux/operations/slices/login-operation';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

export interface LoginState {
  pending: boolean,
  result: LoginOperationResult;
  error: SerializedAxiosError;
}

const loginSlice = createSlice<LoginState, Record<string, never>, `login`>({
  name: `login`,
  initialState: {
    pending: false,
    result: null,
    error: null,
  },
  reducers: {},
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