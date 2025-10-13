import { useQuery } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { HeroServices } from '../heroServices';
import { TTemplateList } from './types';

type TUseTemplateListProps = {
  onSuccess?: (data: TTemplateList) => void;
  onError?: (error: unknown) => void;
  params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  };
};

const useTemplateList = (props?: TUseTemplateListProps) => {
  const useTemplateListFn = async () => {
    try {
      const response = await HeroServices.get<TResponseType<TTemplateList[]>>(
        `/contract-templates`,
        {
          params: {
            page: props?.params?.page,
            limit: props?.params?.limit,
            ...(props?.params?.search && { search: props.params.search }),
            ...(props?.params?.status && { status: props.params.status }),
          },
        },
      );

      if (response.status !== 200) return;

      return response?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      toast.error(err?.response?.data?.message);
      throw err?.response?.data?.message;
    }
  };

  const query = useQuery({
    queryKey: ['useTemplateList', props?.params],
    queryFn: useTemplateListFn,
    enabled: !!props?.params,
  });

  return { ...query };
};

export default useTemplateList;
