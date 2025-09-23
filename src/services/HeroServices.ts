import Axios from 'axios';
import Cookies from 'js-cookie';

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
