import { SerializedAxiosError } from '#src/js/axios/serialized-axios-error';

export interface PREState<T> {
  pending: boolean;
  result: T;
  error: SerializedAxiosError;
}

export const resetPreState = (state: PREState<any>): void => {
  state.pending = false;
  state.result = null;
  state.error = null;
};