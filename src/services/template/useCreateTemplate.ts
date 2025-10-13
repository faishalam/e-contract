import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TTemplateList } from './types';
import { TTemplateForm } from '@/app/(private)/template-management/[id]/validator';

type TUseCreateTemplateProps = {
  onSuccess?: (data: TTemplateList) => void;
  onError?: (error: unknown) => void;
};

const useCreateTemplate = (props?: TUseCreateTemplateProps) => {
  const useCreateTemplateFn = async (payload: TTemplateForm) => {
    try {
      const response = await HeroServices.post<TResponseType<TTemplateList>>(
        `/contract-templates`,
        payload,
      );

      if (response.status !== 201) return;
      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useCreateTemplate'],
    mutationFn: useCreateTemplateFn,
    onSuccess: response => {
      if (response) {
        props?.onSuccess?.(response);
      }
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error?.message);
      }
    },
  });

  return { ...mutation };
};

export default useCreateTemplate;
