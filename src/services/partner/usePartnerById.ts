import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'sonner';
import { TPartnerDetail } from './types';

type TUsePartnerById = {
  onSuccess?: (data: TPartnerDetail) => void;
  onError?: (error: unknown) => void;
  params: {
    id?: string | null;
  };
};

const usePartnerById = (props?: TUsePartnerById) => {
  const usePartnerByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TPartnerDetail>>(
        `/partners/${props?.params?.id}`,
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
    queryKey: ['usePartnerById', props?.params.id],
    queryFn: usePartnerByIdFn,
    retry: false,
    enabled: !!props?.params.id && props?.params.id !== '' && props?.params.id !== null,
  });

  return { ...query };
};

export default usePartnerById;
