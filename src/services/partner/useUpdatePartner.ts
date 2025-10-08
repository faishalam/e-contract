import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TPartnerList } from './types';
import { TPartnerForm } from '@/app/(private)/partner-management/validator';

type TUseUpdatePartnerProps = {
  onSuccess?: (data: TPartnerList) => void;
  onError?: (error: unknown) => void;
};

const useUpdatePartner = (props?: TUseUpdatePartnerProps) => {
  const useUpdatePartnerFn = async ({ id, payload }: { id: string; payload: TPartnerForm }) => {
    try {
      const response = await HeroServices.put<TResponseType<TPartnerList>>(
        `/partners/${id}`,
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
    mutationKey: ['useUpdatePartner'],
    mutationFn: useUpdatePartnerFn,
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

export default useUpdatePartner;
