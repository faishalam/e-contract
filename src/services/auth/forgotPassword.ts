import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TSendOtpResponse } from './types';

type TUserForgotPassword = {
  onSuccess?: (data: TSendOtpResponse) => void;
  onError?: (error: unknown) => void;
};

const useForgotPassword = (props?: TUserForgotPassword) => {
  const useForgotPasswordFn = async ({ email }: { email: string }) => {
    try {
      const response = await AuthServices.post<TResponseType<TSendOtpResponse>>(
        `/auth/forgot-password`,
        {
          email: email,
        },
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
    mutationKey: ['useForgotPassword'],
    mutationFn: useForgotPasswordFn,
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

export default useForgotPassword;
