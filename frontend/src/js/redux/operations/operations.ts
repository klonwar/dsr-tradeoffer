import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginOperation } from '#src/js/redux/operations/slices/login-operation';
import { registrationOperation } from '#src/js/redux/operations/slices/registration-operation';
import { editProfileOperation } from '#src/js/redux/operations/slices/edit-profile-operation';
import { setPhotoOperation } from '#src/js/redux/operations/slices/set-photo';

export const Operations = {
  login: createAsyncThunk(
    `login`,
    loginOperation
  ),
  registration: createAsyncThunk(
    `registration`,
    registrationOperation
  ),
  editProfile: createAsyncThunk(
    `editProfile`,
    editProfileOperation
  ),
  setPhoto: createAsyncThunk(
    `setPhoto`,
    setPhotoOperation
  )
};