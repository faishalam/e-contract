import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TResetPasswordForm } from './types';

type TResetPassword = {
  onSuccess?: (data: TResetPasswordForm) => void;
  onError?: (error: unknown) => void;
};

const useResetPasswordAPI = (props?: TResetPassword) => {
  const useResetPasswordFn = async (payload: TResetPasswordForm) => {
    try {
      const response = await AuthServices.post<TResponseType<TResetPasswordForm>>(
        `/auth/reset-password`,
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
    mutationKey: ['useResetPassword'],
    mutationFn: useResetPasswordFn,
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

export default useResetPasswordAPI;
