import axios, { AxiosError } from 'axios';

export const apiError = (err: AxiosError, message = 'Something went wrong.') => {
  if (axios.isAxiosError(err)) {
    if (axios.isCancel(err)) {
      return;
    } else {
      return (err as AxiosError<{ error: string }>)?.response?.data?.error || message;
    }
  } else {
    return message;
  }
};
