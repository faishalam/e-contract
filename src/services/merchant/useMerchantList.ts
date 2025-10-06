import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TMerchantList } from './types';

type TUserMerchantListProps = {
  onSuccess?: (data: TMerchantList) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
};

const useMerchantList = (props?: TUserMerchantListProps) => {
  const useMerchantListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TMerchantList[]>>(`/merchants`, {
        params: {
          page: props?.params?.page,
          limit: props?.params?.limit,
          ...(props?.params?.search && { name: props.params.search }),
          ...(props?.params?.status && { status: props.params.status }),
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
    queryKey: ['useMerchantList', props?.params],
    queryFn: useMerchantListFn,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useMerchantList;
