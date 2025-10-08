import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TUserList } from '../user/types';
import { TUpdateProfileForm } from '@/context/profileProvider/validator';

type TUseUpdateProfileProps = {
  onSuccess?: (data: TUserList) => void;
  onError?: (error: unknown) => void;
};

const useUpdateProfile = (props?: TUseUpdateProfileProps) => {
  const useUpdateProfileFn = async (payload: TUpdateProfileForm) => {
    try {
      const response = await HeroServices.put<TResponseType<TUserList>>(`/profile`, payload);

      const { status } = response;

      if (status !== 200) return;
      return response.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data?.message || 'Unknown error';
    }
  };

  const mutation = useMutation({
    mutationKey: ['useUpdateProfile'],
    mutationFn: useUpdateProfileFn,
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

export default useUpdateProfile;
