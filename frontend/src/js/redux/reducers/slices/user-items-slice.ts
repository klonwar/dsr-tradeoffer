import { PREState, resetPreState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { GetUserItemsListOperationResult } from '#redux/operations/slices/get-user-items-list-operation';
import { Operations } from '#redux/operations/operations';
import { onError, onFulfilled, onPending } from '#redux/reducers/util/operation-callback';

const initialState: PREState<GetUserItemsListOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const userItemsSlice = createSlice({
  name: `user-items`,
  initialState,
  reducers: {
    reset: resetPreState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getUserItemsList.pending, onPending)
      .addCase(Operations.getUserItemsList.rejected, onError)
      .addCase(Operations.getUserItemsList.fulfilled, onFulfilled);
  },
});

export const UserItemsActions = userItemsSlice.actions;

export const userItemsReducer = userItemsSlice.reducer;