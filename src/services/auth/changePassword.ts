import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { TChangePasswordForm } from '@/context/profileProvider/types';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';

type TUseChangePasswordProps = {
  onSuccess?: (data: null) => void;
  onError?: (error: Error) => void;
};

const useChangePassword = (props?: TUseChangePasswordProps) => {
  const useChangePasswordFn = async (changePasswordForm: TChangePasswordForm) => {
    try {
      const response = await HeroServices.post<TResponseType<null>>(
        `/profile/change-password`,
        changePasswordForm,
      );

      if (response.status !== 200) return null;

      return response.data?.data ?? null;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw new Error(err?.response?.data?.message ?? 'Gagal mengganti kata sandi');
    }
  };

  const mutation = useMutation({
    mutationFn: useChangePasswordFn,
    onSuccess: data => {
      props?.onSuccess?.(data);
    },
    onError: error => {
      toast.error(error.message || 'Terjadi kesalahan');
      props?.onError?.(error);
    },
  });

  return mutation;
};

export default useChangePassword;
