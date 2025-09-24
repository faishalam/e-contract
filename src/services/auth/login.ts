import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TLoginForm } from '@/app/(public)/login/types';
import { TLoginResponse } from './types';

type TUseLoginProps = {
  onSuccess?: (data: TLoginResponse) => void;
  onError?: (error: unknown) => void;
};

const useLoginUser = (props?: TUseLoginProps) => {
  const useLoginUserFn = async (formLogin: TLoginForm) => {
    try {
      const response = await AuthServices.post<TResponseType<TLoginResponse>>(`/login`, formLogin);

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
