import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { HeroServices } from '@/services/heroServices';
import { TContractType } from '@/services/master/master-contract-type/types';

type TUseContractTypeListProps = {
  onSuccess?: (data: TContractType) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
};

const useContractTypeList = (props?: TUseContractTypeListProps) => {
  const useContractTypeListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TContractType[]>>(`/contract-types`, {
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
    queryKey: ['useContractTypeList', props?.params],
    queryFn: useContractTypeListFn,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useContractTypeList;
