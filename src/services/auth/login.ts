import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TLoginResponse } from './types';
import { TLoginForm } from '@/app/(public)/login/validator';

type TUseLoginProps = {
  onSuccess?: (data: TLoginResponse) => void;
  onError?: (error: unknown) => void;
};

const useLoginUser = (props?: TUseLoginProps) => {
  const useLoginUserFn = async (payload: TLoginForm) => {
    try {
      const response = await AuthServices.post<TResponseType<TLoginResponse>>(
        `/auth/login`,
        payload,
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
    mutationKey: ['useLoginUser'],
    mutationFn: useLoginUserFn,
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

export default useLoginUser;
