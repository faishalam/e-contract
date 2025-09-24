import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface GlobalError {
  message: string;
  type: 'network' | 'cors' | 'timeout' | 'server' | 'unknown';
  status?: number;
}

type AppError = AxiosError | Error | unknown;

export const isNetworkError = (error: AppError): boolean => {
  return (
    typeof error === 'object' && error !== null && 'request' in error && !('response' in error)
  );
};

export const isCorsError = (error: AppError): boolean => {
  return (
    error instanceof Error &&
    (error.message?.includes('CORS') ||
      // @ts-expect-error (AxiosError has code)
      error.code === 'ERR_NETWORK')
  );
};

export const isTimeoutError = (error: AppError): boolean => {
  return (
    error instanceof Error &&
    // @ts-expect-error (AxiosError has code)
    (error.code === 'ECONNABORTED' || error.message?.toLowerCase().includes('timeout'))
  );
};

export const handleGlobalError = (error: AppError): GlobalError => {
  console.error('Global Error Handler:', error);

  let type: GlobalError['type'] = 'unknown';
  let message = 'An unexpected error occurred. Please try again.';
  let status: number | undefined;

  if (error instanceof Error) {
    message = error.message || message;
  }

  // kalau axios error, bisa ambil status
  if ((error as AxiosError)?.response) {
    status = (error as AxiosError).response?.status;
  }

  if (isNetworkError(error)) {
    type = 'network';
  } else if (isCorsError(error)) {
    type = 'cors';
  } else if (isTimeoutError(error)) {
    type = 'timeout';
  } else if (status && status >= 500) {
    type = 'server';
  }

  toast.error(message);

  return {
    message,
    type,
    status,
  };
};
