import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';
import { DeleteItemDto } from '#server/common/dto/delete-item.dto';

export class DeleteItemOperationResult extends ItemsListDto {
}

export const deleteItemOperation: AsyncThunkPayloadCreator<DeleteItemOperationResult, DeleteItemDto, { rejectValue: SerializedAxiosError }> =
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<DeleteItemOperationResult>(`items/delete`, payload);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };