import { PREState, resetPreState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { GetItemsListOperationResult } from '#redux/operations/slices/get-items-list-operation';
import { Operations } from '#redux/operations/operations';
import {
  onError,
  onErrorSaveResult,
  onFulfilled,
  onPending,
  onPendingSaveResult,
} from '#redux/reducers/util/operation-callback';

const initialState: PREState<GetItemsListOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const itemsSlice = createSlice({
  name: `items`,
  initialState,
  reducers: {
    reset: resetPreState
  },
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getItemsList.pending, onPending)
      .addCase(Operations.getItemsList.rejected, onError)
      .addCase(Operations.getItemsList.fulfilled, onFulfilled)

      .addCase(Operations.deleteItem.pending, onPendingSaveResult)
      .addCase(Operations.deleteItem.rejected, onErrorSaveResult)
      .addCase(Operations.deleteItem.fulfilled, onFulfilled)

      .addCase(Operations.createItem.pending, onPendingSaveResult)
      .addCase(Operations.createItem.rejected, onErrorSaveResult)
      .addCase(Operations.createItem.fulfilled, onFulfilled)

      .addCase(Operations.editItem.pending, onPendingSaveResult)
      .addCase(Operations.editItem.rejected, onErrorSaveResult)
      .addCase(Operations.editItem.fulfilled, onFulfilled);
  },
});

export const ItemsActions = itemsSlice.actions;

export const itemsReducer = itemsSlice.reducer;