import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { ZodNullableDef } from 'zod/v3';

type TUserForgotPassword = {
  onSuccess?: (data: null) => void;
  onError?: (error: unknown) => void;
};

const useForgotPassword = (props?: TUserForgotPassword) => {
  const useForgotPasswordFn = async ({ email }: { email: string }) => {
    try {
      const response = await AuthServices.post<TResponseType<ZodNullableDef>>(
        `/auth/forgot-password`,
        {
          email: email,
        },
      );

      const { status } = response;

      if (status !== 200) return;

      return null;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useForgotPassword'],
    mutationFn: useForgotPasswordFn,
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

export default useForgotPassword;
