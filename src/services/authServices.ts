import Axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
