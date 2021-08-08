import { PREState } from '#src/js/redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { GetItemsListOperationResult } from '#src/js/redux/operations/slices/get-items-list-operation';
import { Operations } from '#src/js/redux/operations/operations';
import {
  onError,
  onErrorSaveResult,
  onFulfilled,
  onPending,
  onPendingSaveResult,
} from '#src/js/redux/reducers/util/operation-callback';

const initialState: PREState<GetItemsListOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const itemsSlice = createSlice({
  name: `items`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getItemsList.pending, onPending)
      .addCase(Operations.getItemsList.rejected, onError)
      .addCase(Operations.getItemsList.fulfilled, onFulfilled)

      .addCase(Operations.deleteItem.pending, onPendingSaveResult)
      .addCase(Operations.deleteItem.rejected, onErrorSaveResult)
      .addCase(Operations.deleteItem.fulfilled, onFulfilled);
  },
});

export const ItemsActions = itemsSlice.actions;

export const itemsReducer = itemsSlice.reducer;