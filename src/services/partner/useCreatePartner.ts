import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TPartnerForm } from '@/app/(private)/partner-management/validator';

type TUseCreatePartnerProps = {
  onSuccess?: (data: TPartnerForm) => void;
  onError?: (error: unknown) => void;
};

const useCreatePartner = (props?: TUseCreatePartnerProps) => {
  const useCreatePartnerFn = async (payload: TPartnerForm) => {
    try {
      const response = await HeroServices.post<TResponseType<TPartnerForm>>(`/partners`, payload);

      if (response.status !== 201) return;
      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useCreatePartner'],
    mutationFn: useCreatePartnerFn,
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

export default useCreatePartner;
