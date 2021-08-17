import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';
import { CreateItemDto } from '#server/common/dto/create-item.dto';
import { Operations } from '#redux/operations/operations';

export class CreateItemOperationResult extends ItemsListDto {}

export const createItemOperation: AsyncThunkPayloadCreator<CreateItemOperationResult, {
  data: CreateItemDto,
  photos?: FileList
}, { rejectValue: SerializedAxiosError }> = async ({
                                                     data,
                                                     photos = null,
                                                   }, { rejectWithValue, dispatch }) => {
  try {
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      formData.append(key, value);
    });
    if (photos)
      Array.from(photos).map((photo) => {
        formData.append(`photos`, photo);
      });
    const res = await axiosInstance.post<CreateItemOperationResult>(`item/create`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });

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