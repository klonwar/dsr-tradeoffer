import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { AccountsListDto } from '#server/common/dto/accounts-list.dto';

export class GetAccountsListOperationResult extends AccountsListDto {
}

export const getAccountsListOperation: AsyncThunkPayloadCreator<GetAccountsListOperationResult, null, { rejectValue: SerializedAxiosError }> =
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get<GetAccountsListOperationResult>(`accounts`);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };