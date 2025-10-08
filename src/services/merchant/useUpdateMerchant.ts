import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TMerchantForm } from '@/app/(private)/merchant-management/[id]/validator';
import { TMerchantList } from './types';

type TUseUpdateMerchantProps = {
  onSuccess?: (data: TMerchantList) => void;
  onError?: (error: unknown) => void;
};

const useUpdateMerchant = (props?: TUseUpdateMerchantProps) => {
  const useUpdateMerchantFn = async ({ id, payload }: { id: string; payload: TMerchantForm }) => {
    try {
      const response = await HeroServices.put<TResponseType<TMerchantList>>(
        `/merchants/${id}`,
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
    mutationKey: ['useUpdateMerchant'],
    mutationFn: useUpdateMerchantFn,
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

export default useUpdateMerchant;
