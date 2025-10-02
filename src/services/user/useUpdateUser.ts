import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TUser, TUserForm } from './types';

type TUserUpdateUser = {
  onSuccess?: (data: TUser) => void;
  onError?: (error: unknown) => void;
};

const useUpdateUser = (props?: TUserUpdateUser) => {
  const useUpdateUserFn = async ({ id, payload }: { id: string; payload: TUserForm }) => {
    try {
      const response = await HeroServices.put<TResponseType<TUser>>(`/users/${id}`, payload);

      const { status } = response;

      if (status !== 200) return;
      return response.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data?.message || 'Unknown error';
    }
  };

  const mutation = useMutation({
    mutationKey: ['useUpdateUser'],
    mutationFn: useUpdateUserFn,
    onSuccess: data => {
      if (data) {
        props?.onSuccess?.(data);
      }
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });

  return { ...mutation };
};

export default useUpdateUser;
