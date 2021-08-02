import { createSlice } from '@reduxjs/toolkit';
import { Operations } from '#src/js/redux/operations/operations';
import { LoginOperationResult } from '#src/js/redux/operations/slices/login-operation';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

export const USER_SLICE_NAME = `user`;

export interface UserState {
  pending: boolean,
  result: LoginOperationResult;
  error: SerializedAxiosError;
}

const initialState: UserState = {
  pending: false,
  result: null,
  error: null,
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.pending = false;
      state.result = null;
      state.error = null;
    },
    stateFromStorage: () => {
      let stateFromStorage;
      try {
        stateFromStorage = JSON.parse(localStorage.getItem(USER_SLICE_NAME));
      } catch (e) {
        stateFromStorage = null;
      }
      
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

export const UserActions = userSlice.actions;

export const userReducer = userSlice.reducer;