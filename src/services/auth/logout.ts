import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';

type TLogoutUserProps = {
  onSuccess?: (data: null) => void;
  onError?: (error: string) => void;
};

const useLogoutUser = (props?: TLogoutUserProps) => {
  const logoutUserFn = async (refreshToken: string): Promise<null> => {
    try {
      const response = await HeroServices.post<TResponseType<null>>(`/auth/logout`, {
        refresh_token: refreshToken,
      });

      if (response.status !== 200) {
        return null;
      }

      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation<null, Error, string>({
    mutationKey: ['useLogoutUser'],
    mutationFn: logoutUserFn,
    onSuccess: data => {
      props?.onSuccess?.(data);
    },
    onError: error => {
      props?.onError?.(error.message);
    },
  });

  return mutation;
};

export default useLogoutUser;
