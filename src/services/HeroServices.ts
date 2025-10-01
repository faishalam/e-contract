import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/`;

export const HeroServices = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

HeroServices.interceptors.request.use(
  config => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

let isRedirecting = false;
const rawAxios = axios.create();

HeroServices.interceptors.response.use(
  res => res,
  async err => {
    const status = err.response?.status;

    if (status === 401 && !isRedirecting) {
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      try {
        if (accessToken) {
          const res = await rawAxios.post(`${baseURL}auth/validate`, {
            token: accessToken,
          });
          if (res.data.valid === false) {
            await rawAxios.post(`${baseURL}/api/v1/auth/logout`, { refresh_token: refreshToken });
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            isRedirecting = true;
            Router.replace('/login');
          }
        } else {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          isRedirecting = true;
          Router.replace('/login');
        }
      } catch {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        isRedirecting = true;
        Router.replace('/login');
      }
    }

    return Promise.reject(err);
  },
);
