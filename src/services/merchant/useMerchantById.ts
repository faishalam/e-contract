import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TMerchantList } from './types';

type TUseMerchantByIdProps = {
  onSuccess?: (data: TMerchantList) => void;
  onError?: (error: unknown) => void;
  params: {
    id: string;
  };
};

const useMerchantById = (props?: TUseMerchantByIdProps) => {
  const useMerchantByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TMerchantList>>(
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
    queryKey: ['useMerchantById', props?.params.id],
    queryFn: useMerchantByIdFn,
    retry: false,
    enabled: !!props?.params.id && props?.params.id !== '',
  });

  return { ...query };
};

export default useMerchantById;
