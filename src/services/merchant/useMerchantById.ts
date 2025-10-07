import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'react-toastify';
import { TMerchantDetail } from './types';

type TUseMerchantByIdProps = {
  onSuccess?: (data: TMerchantDetail) => void;
  onError?: (error: unknown) => void;
  params: {
    id?: string | null;
  };
};

const useMerchantById = (props?: TUseMerchantByIdProps) => {
  const useMerchantByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TMerchantDetail>>(
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
    enabled: !!props?.params.id && props?.params.id !== '' && props?.params.id !== null,
  });

  return { ...query };
};

export default useMerchantById;
