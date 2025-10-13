import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TTemplateForm } from '@/app/(private)/template-management/[id]/validator';

type TUseUpdateTemplateProps = {
  onSuccess?: (data: TTemplateForm) => void;
  onError?: (error: unknown) => void;
};

const useUpdateTemplate = (props?: TUseUpdateTemplateProps) => {
  const useUpdateTemplateFn = async ({ id, payload }: { id: string; payload: TTemplateForm }) => {
    try {
      const response = await HeroServices.put<TResponseType<TTemplateForm>>(
        `/contract-templates/${id}`,
        payload,
      );

      const { status } = response;

      if (status !== 200) return;
      return response.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data?.message || 'Unknown error';
    }
  };

  const mutation = useMutation({
    mutationKey: ['useUpdateTemplate'],
    mutationFn: useUpdateTemplateFn,
    onSuccess: data => {
      if (data) {
        props?.onSuccess?.(data);
      }
    },
    onError: error => {
      if (props?.onError) {
        props.onError(error);
      }
    },
  });

  return { ...mutation };
};

export default useUpdateTemplate;
