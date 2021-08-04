import axiosInstance from '#src/js/axios/axios-instance';
import { UserFormData } from '#components/login/login';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';

export interface LoginOperationResult {
  access_token: string;
}

export const loginOperation: AsyncThunkPayloadCreator<LoginOperationResult, UserFormData, { rejectValue: SerializedAxiosError }> =
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<LoginOperationResult>(`auth/login`, payload);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };