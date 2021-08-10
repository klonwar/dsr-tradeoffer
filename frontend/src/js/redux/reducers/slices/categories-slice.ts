import { PREState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { GetCategoriesListOperationResult } from '#redux/operations/slices/get-categories-list-operation';
import { Operations } from '#redux/operations/operations';
import { onError, onFulfilled, onPending } from '#redux/reducers/util/operation-callback';

const initialState: PREState<GetCategoriesListOperationResult> = {
  pending: false,
  result: null,
  error: null,
};

const categoriesSlice = createSlice({
  name: `categories`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Operations.getCategoriesList.pending, onPending)
      .addCase(Operations.getCategoriesList.rejected, onError)
      .addCase(Operations.getCategoriesList.fulfilled, onFulfilled);
  },
});

export const CategoriesActions = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;