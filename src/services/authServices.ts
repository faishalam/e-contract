import Axios from 'axios';
import { handleGlobalError } from '@/utils/globalErrorHandler';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error interceptor for AuthServices
AuthServices.interceptors.response.use(
  response => response,
  error => {
    handleGlobalError(error);
    return Promise.reject(error);
  },
);
