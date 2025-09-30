import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TVerifyUserToken } from './types';

type TUserVerifyTokenProps = {
  onSuccess?: (data: TVerifyUserToken) => void;
  onError?: (error: unknown) => void;
};

const useVerifyToken = (props?: TUserVerifyTokenProps) => {
  const useVerifyTokenFn = async (accessToken: string) => {
    try {
      const response = await AuthServices.post<TResponseType<TVerifyUserToken>>(
        `/api/v1/auth/validate`,
        { token: accessToken },
      );

      const { status, data } = response;

      if (status !== 200) return;

      return data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useVerifyToken'],
    mutationFn: useVerifyTokenFn,
    onSuccess: response => {
      if (response) {
        props?.onSuccess?.(response);
      }
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error?.message);
      }
    },
  });

  return { ...mutation };
};

export default useVerifyToken;
