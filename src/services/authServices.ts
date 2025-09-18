import Axios from 'axios';

const baseURL = 'https://api.ganipedia.xyz/auth/';

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
