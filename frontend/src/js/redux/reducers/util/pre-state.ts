import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

export interface PREState<T> {
  pending: boolean;
  result: T;
  error: SerializedAxiosError;
}