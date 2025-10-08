import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'sonner';
import { TMerchantStats } from './types';

const useMerchantStats = () => {
  const useMerchantStatsFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TMerchantStats>>(`/merchants/stats`);

      if (response.status !== 200) return;

      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['useMerchantStats'],
    queryFn: useMerchantStatsFn,
    enabled: true,
  });

  return { ...query };
};

export default useMerchantStats;
