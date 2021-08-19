import { PREState } from '#redux/reducers/util/pre-state';
import { createSlice } from '@reduxjs/toolkit';
import { LoadCatalogueOperationResult } from '#redux/operations/slices/load-catalogue-operation';
import { Operations } from '#redux/operations/operations';
import { onErrorSaveResult, onPendingSaveResult } from '#redux/reducers/util/operation-callback';
import { AppPaginationMeta } from '#server/common/classes/pagination';

export interface CatalogueResult {
  currentMeta: AppPaginationMeta;
  pages: {
    [page: number]: LoadCatalogueOperationResult
  };
}

const initialState: PREState<CatalogueResult> = {
  pending: false,
  result: {
    currentMeta: null,
    pages: {},
  },
  error: null,
};

const catalogueSlice = createSlice({
  name: `catalogue`,
  initialState,
  reducers: {
    reset: (state) => {
      state.pending = false;
      state.error = null;
      state.result = initialState.result;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Operations.loadCatalogue.pending, onPendingSaveResult)
      .addCase(Operations.loadCatalogue.rejected, onErrorSaveResult)
      .addCase(Operations.loadCatalogue.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        if (action.payload.items.length > 0) {
          state.result.pages[action.meta.page] = action.payload;
          state.result.currentMeta = action.payload.meta;
        }
      })

      .addCase(Operations.deleteCatalogueItem.pending, onPendingSaveResult)
      .addCase(Operations.deleteCatalogueItem.rejected, onErrorSaveResult)
      .addCase(Operations.deleteCatalogueItem.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        if (action.payload) {
          // Очищаем целиком хранилище
          state.result.pages = {};
          state.result.currentMeta = null;
        }
      });
  },
});

export const CatalogueActions = catalogueSlice.actions;

export const catalogueReducer = catalogueSlice.reducer;