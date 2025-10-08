import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { HeroServices } from '../heroServices';
import { TContractList } from './types';

type TUserContractListProps = {
  onSuccess?: (data: TContractList) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
};

const useContractList = (props?: TUserContractListProps) => {
  const useContractListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TContractList[]>>(`/contracts`, {
        params: {
          page: props?.params?.page,
          limit: props?.params?.limit,
          ...(props?.params?.search && { search: props.params.search }),
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
    queryKey: ['useContractList', props?.params],
    queryFn: useContractListFn,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useContractList;
