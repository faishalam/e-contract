import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TSendOtpResponse } from './types';

type TVerifyOtp = {
  onSuccess?: (data: TSendOtpResponse) => void;
  onError?: (error: unknown) => void;
};

const useVerifyOtp = (props?: TVerifyOtp) => {
  const useVerifyOtpFn = async ({ email, otp }: { email: string; otp: string }) => {
    try {
      const response = await AuthServices.post<TResponseType<TSendOtpResponse>>(
        `/auth/otp/verify-activation`,
        { email, otp },
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
    mutationKey: ['useVerifyOtp'],
    mutationFn: useVerifyOtpFn,
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

export default useVerifyOtp;
