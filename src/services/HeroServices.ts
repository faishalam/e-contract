import Axios from 'axios';
import Cookies from 'js-cookie';
import { handleGlobalError } from '@/utils/globalErrorHandler';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const HeroServices = Axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

HeroServices.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;
let pendingRequests: Array<(token: string | null) => void> = [];

HeroServices.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Handle 401 (token refresh logic)
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(resolve => {
          pendingRequests.push((newToken: string | null) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(HeroServices(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const refreshPath = (process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH || 'auth/refresh').replace(
          /^\//,
          '',
        );
        const url = `${baseURL.replace(/\/$/, '')}/${refreshPath}`;
        const resp = await Axios.post(url, { refreshToken });
        const newAccessToken = resp?.data?.data?.accessToken || resp?.data?.accessToken;
        if (!newAccessToken) throw new Error('No access token in refresh response');

        Cookies.set('accessToken', newAccessToken, {
          expires: 7,
          sameSite: 'lax',
          // secure: process.env.NODE_ENV === 'production',
          path: '/',
        });

        pendingRequests.forEach(cb => cb(newAccessToken));
        pendingRequests = [];

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return HeroServices(originalRequest);
      } catch (refreshErr) {
        pendingRequests.forEach(cb => cb(null));
        pendingRequests = [];
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    if (status !== 401) {
      handleGlobalError(error);
    }

    return Promise.reject(error);
  },
);
