import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TContractList } from './types';

type TUseContractById = {
  onSuccess?: (data: TContractList) => void;
  onError?: (error: unknown) => void;
  params: {
    id?: string | null;
  };
};

const useContractById = (props?: TUseContractById) => {
  const useContractByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TContractList>>(
        `/merchants/${props?.params?.id}`,
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
    queryKey: ['useContractById', props?.params.id],
    queryFn: useContractByIdFn,
    retry: false,
    enabled: !!props?.params.id && props?.params.id !== '' && props?.params.id !== null,
  });

  return { ...query };
};

export default useContractById;
