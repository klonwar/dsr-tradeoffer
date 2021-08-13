import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';
import { EditItemDto } from '#server/common/dto/edit-item.dto';

export class EditItemOperationResult extends ItemsListDto {
}

export const editItemOperation: AsyncThunkPayloadCreator<EditItemOperationResult, EditItemDto, { rejectValue: SerializedAxiosError }> =
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put<EditItemOperationResult>(`items/edit`, payload);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };