import { createSlice } from '@reduxjs/toolkit';
import { Operations } from '#redux/operations/operations';
import {
  onError,
  onErrorSaveResult,
  onFulfilled,
  onPending,
  onPendingSaveResult,
} from '#redux/reducers/util/operation-callback';
import { PREState, resetPreState } from '#redux/reducers/util/pre-state';
import { GetAccountsListOperationResult } from '#redux/operations/slices/get-accounts-list-operation';

export const ACCOUNTS_SLICE_NAME = `accounts`;

const initialState: PREState<GetAccountsListOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const accountsSlice = createSlice({
  name: ACCOUNTS_SLICE_NAME,
  initialState: initialState,
  reducers: {
    reset: resetPreState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getAccountsList.pending, onPending)
      .addCase(Operations.getAccountsList.rejected, onError)
      .addCase(Operations.getAccountsList.fulfilled, onFulfilled)

      .addCase(Operations.deleteAccount.pending, onPendingSaveResult)
      .addCase(Operations.deleteAccount.rejected, onErrorSaveResult)
      .addCase(Operations.deleteAccount.fulfilled, onFulfilled);
  },
});

export const AccountsActions = accountsSlice.actions;

export const accountsReducer = accountsSlice.reducer;