import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';

export class DeleteItemOperationResult extends ItemsListDto {
}

export const deleteItemOperation: AsyncThunkPayloadCreator<DeleteItemOperationResult, number, { rejectValue: SerializedAxiosError }> =
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete<DeleteItemOperationResult>(`items/${id}`);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };