import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';
import { EditItemDto } from '#server/common/dto/edit-item.dto';
import { Operations } from '#redux/operations/operations';

export class EditItemOperationResult extends ItemsListDto {
}

export const editItemOperation: AsyncThunkPayloadCreator<EditItemOperationResult, EditItemDto, { rejectValue: SerializedAxiosError }> =
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.patch<EditItemOperationResult>(`item/${payload.id}`, payload);

      // Обновим информацию и в списке предметов
      dispatch(Operations.getUserItemsList());

      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };