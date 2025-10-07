import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TPartnerList } from './types';

type TUsePartnerList = {
  onSuccess?: (data: TPartnerList) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    role?: string;
  };
};

const usePartnerList = (props?: TUsePartnerList) => {
  const usePartnerListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TPartnerList[]>>(`/partners`, {
        params: {
          page: props?.params?.page,
          limit: props?.params?.limit,
          ...(props?.params?.search && { search: props.params.search }),
          ...(props?.params?.status && { status: props.params.status }),
          ...(props?.params?.role && { role: props.params.role }),
        },
      });

      if (response.status !== 200) return;

      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['usePartnerList', props?.params],
    queryFn: usePartnerListFn,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default usePartnerList;
