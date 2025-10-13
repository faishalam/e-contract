import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';

type TUseDeleteTemplateProps = {
  onSuccess?: (data: null) => void;
  onError?: (error: unknown) => void;
};

const useDeleteTemplate = (props?: TUseDeleteTemplateProps) => {
  const useDeleteTemplateFn = async (id: string) => {
    try {
      const response = await HeroServices.delete<TResponseType<null>>(`/contract-templates/${id}`);

      const { status } = response;

      if (status !== 200) return;

      return null;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useDeleteTemplate'],
    mutationFn: useDeleteTemplateFn,
    onSuccess: response => {
      props?.onSuccess?.(response ?? null);
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error?.message);
      }
    },
  });

  return { ...mutation };
};

export default useDeleteTemplate;
