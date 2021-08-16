import { PREState, resetPreState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { GetUserItemsListOperationResult } from '#redux/operations/slices/get-user-items-list-operation';
import { Operations } from '#redux/operations/operations';
import {
  onError,
  onErrorSaveResult,
  onFulfilled,
  onPending,
  onPendingSaveResult,
} from '#redux/reducers/util/operation-callback';

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
      .addCase(Operations.getUserItemsList.fulfilled, onFulfilled)

      .addCase(Operations.deleteUserItem.pending, onPendingSaveResult)
      .addCase(Operations.deleteUserItem.rejected, onErrorSaveResult)
      .addCase(Operations.deleteUserItem.fulfilled, onFulfilled)

      .addCase(Operations.createItem.pending, onPendingSaveResult)
      .addCase(Operations.createItem.rejected, onErrorSaveResult)
      .addCase(Operations.createItem.fulfilled, onFulfilled)

      .addCase(Operations.editItem.pending, onPendingSaveResult)
      .addCase(Operations.editItem.rejected, onErrorSaveResult)
      .addCase(Operations.editItem.fulfilled, onFulfilled)

      .addCase(Operations.setItemPhotos.pending, onPendingSaveResult)
      .addCase(Operations.setItemPhotos.rejected, onErrorSaveResult)
      .addCase(Operations.setItemPhotos.fulfilled, onFulfilled);
  },
});

export const UserItemsActions = userItemsSlice.actions;

export const userItemsReducer = userItemsSlice.reducer;