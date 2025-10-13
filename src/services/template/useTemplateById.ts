import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { toast } from 'sonner';
import { TTemplateList } from './types';

type TUseTemplateByIdProps = {
  onSuccess?: (data: TTemplateList) => void;
  onError?: (error: unknown) => void;
  params: {
    id?: string | null;
  };
};

const useTemplateById = (props?: TUseTemplateByIdProps) => {
  const useTemplateByIdFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TTemplateList>>(
        `/contract-templates/${props?.params?.id}`,
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
    queryKey: ['useTemplateById', props?.params.id],
    queryFn: useTemplateByIdFn,
    retry: false,
    enabled: !!props?.params.id && props?.params.id !== '' && props?.params.id !== null,
  });

  return { ...query };
};

export default useTemplateById;
