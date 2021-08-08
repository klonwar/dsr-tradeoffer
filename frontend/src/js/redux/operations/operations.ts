import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginOperation } from '#src/js/redux/operations/slices/login-operation';
import { registrationOperation } from '#src/js/redux/operations/slices/registration-operation';
import { editProfileOperation } from '#src/js/redux/operations/slices/edit-profile-operation';
import { setPhotoOperation } from '#src/js/redux/operations/slices/set-photo-operation';
import { changePasswordOperation } from '#src/js/redux/operations/slices/change-password-operation';
import { getItemsListOperation } from '#src/js/redux/operations/slices/get-items-list-operation';
import { deleteItemOperation } from '#src/js/redux/operations/slices/delete-item-operation';

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
  ),
  changePassword: createAsyncThunk(
    `changePassword`,
    changePasswordOperation
  ),
  getItemsList: createAsyncThunk(
    `getItemsList`,
    getItemsListOperation
  ),
  deleteItem: createAsyncThunk(
    `deleteItem`,
    deleteItemOperation
  )
};