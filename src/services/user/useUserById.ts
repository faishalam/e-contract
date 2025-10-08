import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TUserList } from './types';

type TUseUserById = {
  onSuccess?: (data: TUserList) => void;
  onError?: (error: unknown) => void;
  params: {
    id: string;
  };
};

const useUserById = (props?: TUseUserById) => {
  const useUserByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TUserList>>(
        `/users/${props?.params?.id}`,
      );

      if (response.status !== 200) return;

      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['useUserById', props?.params.id],
    queryFn: useUserByIdFn,
    staleTime: Infinity,
    enabled: !!props?.params.id && props?.params.id !== '', // ✅ tidak fetch kalau id kosong/null
  });

  return { ...query };
};

export default useUserById;
