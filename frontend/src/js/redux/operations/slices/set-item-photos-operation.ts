import axiosInstance from '#src/js/axios/axios-instance';
import axios from 'axios';
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';
import { classToPlain } from 'class-transformer';
import { ItemsListDto } from '#server/common/dto/items-list.dto';
import { EditItemDto } from '#server/common/dto/edit-item.dto';

export class SetItemPhotosOperationPayload extends EditItemDto {
  photos: FileList;
}

export class SetItemPhotosOperationResult extends ItemsListDto {
}

export const setItemPhotosOperation: AsyncThunkPayloadCreator<SetItemPhotosOperationResult, SetItemPhotosOperationPayload, { rejectValue: SerializedAxiosError }> =
  async (data, { rejectWithValue }) => {
    try {
      const { id, photos } = data;
      const formData = new FormData();
      formData.append(`id`, id + ``);
      if (photos)
        Array.from(photos).map((photo) => {
          formData.append(`photos`, photo);
        });
      const res = await axiosInstance.put<SetItemPhotosOperationResult>(`items/set_photos`, formData);
      return res.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(classToPlain(new SerializedAxiosError(e)));
      } else {
        return rejectWithValue(e);
      }
    }
  };