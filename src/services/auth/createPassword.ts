import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { AuthServices } from '../authServices';
import { TCreateNewPasswordForm } from '@/app/(public)/login/validator';

type TUseCreatePasswordProps = {
  onSuccess?: (data: null) => void;
  onError?: (error: unknown) => void;
};

const useCreatePassword = (props?: TUseCreatePasswordProps) => {
  const useCreatePasswordFn = async (payload: TCreateNewPasswordForm) => {
    try {
      const response = await AuthServices.post<TResponseType<null>>(
        `/auth/create-password`,
        payload,
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
    mutationKey: ['useCreatePassword'],
    mutationFn: useCreatePasswordFn,
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

export default useCreatePassword;
