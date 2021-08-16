import { PREState, resetPreState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { Operations } from '#redux/operations/operations';
import { onError, onFulfilled, onPending } from '#redux/reducers/util/operation-callback';
import { GetItemOperationResult } from '#redux/operations/slices/get-item-operation';

const initialState: PREState<GetItemOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const itemSlice = createSlice({
  name: `item`,
  initialState,
  reducers: {
    reset: resetPreState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getItem.pending, onPending)
      .addCase(Operations.getItem.rejected, onError)
      .addCase(Operations.getItem.fulfilled, onFulfilled);
  },
});

export const ItemActions = itemSlice.actions;

export const itemReducer = itemSlice.reducer;