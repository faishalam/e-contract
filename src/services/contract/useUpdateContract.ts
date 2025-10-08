import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { HeroServices } from '../heroServices';
import { TContractList } from './types';
import { TContractForm } from '@/app/(private)/contract-management/create/validator';

type TUseUpdateContractProps = {
  onSuccess?: (data: TContractList) => void;
  onError?: (error: unknown) => void;
};

const useUpdateContract = (props?: TUseUpdateContractProps) => {
  const useUpdateContractFn = async ({ id, payload }: { id: string; payload: TContractForm }) => {
    try {
      const response = await HeroServices.put<TResponseType<TContractList>>(
        `/contracts/${id}`,
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
    mutationKey: ['useUpdateContract'],
    mutationFn: useUpdateContractFn,
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

export default useUpdateContract;
