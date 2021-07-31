import { AxiosError } from 'axios';
import { SerializedError } from '@reduxjs/toolkit';
import { Expose } from 'class-transformer';

export class SerializedAxiosError implements SerializedError {
  @Expose()
  code?: string;

  @Expose()
  message?: string;

  @Expose()
  name?: string;

  @Expose()
  stack?: string;

  constructor(axiosError: AxiosError) {
    this.stack = axiosError.stack;
    this.name = axiosError.name;
    this.code = (axiosError.response)
      ? axiosError.response.status + ``
      : undefined;
    this.message = axiosError.message;
  }
}