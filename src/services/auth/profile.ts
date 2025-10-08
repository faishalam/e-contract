import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TUserProfile } from './types';
import { toast } from 'sonner';

type TUseUserProfile = {
  onSuccess?: (data: TUserProfile) => void;
  onError?: (error: unknown) => void;
  params: null;
};

const useUserProfile = (props?: TUseUserProfile) => {
  const useUserProfileFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TUserProfile>>(`/profile`);

      if (response.status !== 200) return;

      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['useUserProfile', props?.params],
    queryFn: useUserProfileFn,
    staleTime: Infinity,
    retry: false,
    enabled: true,
  });

  return { ...query };
};

export default useUserProfile;
