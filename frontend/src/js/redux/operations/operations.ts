import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginOperation } from '#src/js/redux/operations/slices/login-operation';

export const Operations = {
  login: createAsyncThunk(
    `login`,
    loginOperation
  )
};