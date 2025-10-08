import { useMutation } from '@tanstack/react-query';
import { NetworkAPIError, TResponseType } from '@/utils/response-type';
import { AxiosError } from 'axios';
import { TContractList } from './types';
import { HeroServices } from '../heroServices';
import { TContractForm } from '@/app/(private)/contract-management/create/validator';

type TUseCreateContractProps = {
  onSuccess?: (data: TContractList) => void;
  onError?: (error: unknown) => void;
};

const useCreateContract = (props?: TUseCreateContractProps) => {
  const useCreateContractFn = async (payload: TContractForm) => {
    try {
      const response = await HeroServices.post<TResponseType<TContractList>>(`/contracts`, payload);

      if (response.status !== 201) return;
      return response?.data?.data;
    } catch (error) {
      const err = error as AxiosError<NetworkAPIError>;
      throw err?.response?.data;
    }
  };

  const mutation = useMutation({
    mutationKey: ['useCreateContract'],
    mutationFn: useCreateContractFn,
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

export default useCreateContract;
