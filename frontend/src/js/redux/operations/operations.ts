import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginOperation } from '#redux/operations/slices/login-operation';
import { registrationOperation } from '#redux/operations/slices/registration-operation';
import { editProfileOperation } from '#redux/operations/slices/edit-profile-operation';
import { setPhotoOperation } from '#redux/operations/slices/set-photo-operation';
import { changePasswordOperation } from '#redux/operations/slices/change-password-operation';
import { getItemsListOperation } from '#redux/operations/slices/get-items-list-operation';
import { deleteItemOperation } from '#redux/operations/slices/delete-item-operation';
import { getCategoriesListOperation } from '#redux/operations/slices/get-categories-list-operation';

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
  ),
  getCategoriesList: createAsyncThunk(
    `getCategoriesList`,
    getCategoriesListOperation
  )
};