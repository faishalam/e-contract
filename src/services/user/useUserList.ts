import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'sonner';
import { TUserList } from './types';

type TUseUserList = {
  onSuccess?: (data: TUserList) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    role?: string;
    status?: string;
  };
};

const useUserList = (props?: TUseUserList) => {
  const useUserListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TUserList[]>>(`/users`, {
        params: {
          page: props?.params?.page,
          limit: props?.params?.limit,
          ...(props?.params?.search && { name: props.params.search }),
          ...(props?.params?.role && { role: props.params.role }),
          ...(props?.params?.status && { status: props.params.status }),
        },
      });

      if (response.status !== 200) return;

      return response?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['useUserList', props?.params],
    queryFn: useUserListFn,
    staleTime: Infinity,
    retry: false,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useUserList;
