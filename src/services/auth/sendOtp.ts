import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';

type TSendOtpProps = {
  onSuccess?: (data: null) => void;
  onError?: (error: unknown) => void;
};

const useSendOtp = (props?: TSendOtpProps) => {
  const useSendOtpFn = async ({ email }: { email: string }) => {
    try {
      const response = await AuthServices.post<TResponseType<null>>(`/auth/otp/send-activation`, {
        email,
      });

      const { status } = response;

      if (status !== 200) return;

      return null;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useSendOtp'],
    mutationFn: useSendOtpFn,
    onSuccess: response => {
      props?.onSuccess?.(response ?? null);
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error?.message);
      }
    },
  });

  return { ...mutation };
};

export default useSendOtp;
