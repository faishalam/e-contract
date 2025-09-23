import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';

const useLogoutUser = () => {
  const useLogoutUserFn = async () => {
    try {
      const response = await HeroServices.post<TResponseType<null>>(`auth/logout`);

      const { status, data } = response;

      if (status !== 200) return;

      return data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useLogoutUser'],
    mutationFn: useLogoutUserFn,
  });

  return { ...mutation };
};

export default useLogoutUser;
