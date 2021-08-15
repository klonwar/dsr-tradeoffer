import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginOperation } from '#redux/operations/slices/login-operation';
import { registrationOperation } from '#redux/operations/slices/registration-operation';
import { editProfileOperation } from '#redux/operations/slices/edit-profile-operation';
import { setPhotoOperation } from '#redux/operations/slices/set-photo-operation';
import { changePasswordOperation } from '#redux/operations/slices/change-password-operation';
import { getItemsListOperation } from '#redux/operations/slices/get-items-list-operation';
import { deleteItemOperation } from '#redux/operations/slices/delete-item-operation';
import { getCategoriesListOperation } from '#redux/operations/slices/get-categories-list-operation';
import { createItemOperation } from '#redux/operations/slices/create-item-operation';
import { editItemOperation } from '#redux/operations/slices/edit-item-operation';
import { setItemPhotosOperation } from '#redux/operations/slices/set-item-photos-operation';
import { getAccountsListOperation } from '#redux/operations/slices/get-accounts-list-operation';
import { deleteAccountOperation } from '#redux/operations/slices/delete-account-operation';

export const Operations = {
  login: createAsyncThunk(
    `login`,
    loginOperation,
  ),
  registration: createAsyncThunk(
    `registration`,
    registrationOperation,
  ),
  editProfile: createAsyncThunk(
    `editProfile`,
    editProfileOperation,
  ),
  setPhoto: createAsyncThunk(
    `setPhoto`,
    setPhotoOperation,
  ),
  changePassword: createAsyncThunk(
    `changePassword`,
    changePasswordOperation,
  ),
  getItemsList: createAsyncThunk(
    `getItemsList`,
    getItemsListOperation,
  ),
  deleteItem: createAsyncThunk(
    `deleteItem`,
    deleteItemOperation,
  ),
  getCategoriesList: createAsyncThunk(
    `getCategoriesList`,
    getCategoriesListOperation,
  ),
  createItem: createAsyncThunk(
    `createItem`,
    createItemOperation,
  ),
  editItem: createAsyncThunk(
    `editItem`,
    editItemOperation,
  ),
  setItemPhotos: createAsyncThunk(
    `setItemPhotos`,
    setItemPhotosOperation,
  ),
  getAccountsList: createAsyncThunk(
    `getAccountsList`,
    getAccountsListOperation,
  ),
  deleteAccount: createAsyncThunk(
    `deleteAccount`,
    deleteAccountOperation,
  ),
};