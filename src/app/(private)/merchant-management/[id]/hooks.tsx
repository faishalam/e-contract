'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { usePathname, useRouter } from 'next/navigation';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormPersist from 'react-hook-form-persist';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import useCreateMerchant from '@/services/merchant/useCreateMerchant';
import useUpdateMerchant from '@/services/merchant/useUpdateMerchant';
import { merchantSchema, TMerchantForm } from './validator';
import useMerchantManagement from '../hooks';

const useCreateMerchantValue = () => {
  const pathName = usePathname();
  const queryClient = useQueryClient();
  const modalWarningInfo = useModalWarningInfo();
  const router = useRouter();

  const id = useMemo(() => {
    const lastPath = pathName.split('/').pop();
    if (lastPath === 'new') {
      return null;
    }
    return lastPath;
  }, [pathName]);

  const { dataMerchantById, isLoadingMerchantById, errorMerchantById } = useMerchantManagement();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<TMerchantForm>({
    resolver: zodResolver(merchantSchema),
    defaultValues: {
      company_name: '',
      brand_name: '',
      npwp: '',
      nib: '',
      industry: '',
      company_size: '',
      status: '',
      profile: {
        address: '',
        city: '',
        province: '',
        postal_code: '',
        website: '',
        company_email: '',
        company_phone: '',
        fax: '',
        joined_date: '',
        renewal_date: '',
        plan: '',
        price: null,
      },
      pics: [
        {
          name: '',
          email: '',
          phone: '',
          office_phone: '',
          position: '',
          department: '',
        },
      ],
    },
    mode: 'onChange',
  });

  useFormPersist('create-merchant-form', {
    watch,
    setValue,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  const { mutate: mutateCreateMerchant, isPending: isLoadingCreateMerchant } = useCreateMerchant({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useMerchantList'] });
      router.push('/merchant-management');
      toast.success('Merchant Berhasil Ditambahkan');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateUpdateMerchant, isPending: isLoadingUpdateMerchant } = useUpdateMerchant({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useMerchantList'] });
      router.push('/merchant-management');
      toast.success('Merchant Berhasil Diperbarui');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit: SubmitHandler<TMerchantForm> = data => {
    const payload = {
      ...data,
      profile: {
        ...data.profile,
        joined_date: new Date(data.profile.joined_date).toISOString(),
        renewal_date: new Date(data.profile.renewal_date).toISOString(),
      },
    };
    if (!id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin menambahkan merchant ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateCreateMerchant(payload);
        },
      });
    }

    if (id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin mengubah merchant ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateUpdateMerchant({ id: id || '', payload: payload });
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<TMerchantForm>) => {
    const showErrors = (errObj: FieldErrors<TMerchantForm>) => {
      Object.values(errObj).forEach(error => {
        if (!error) return;
        if (typeof error === 'object' && error !== null) {
          if ('message' in error && error.message) {
            toast.error(String(error.message));
          }
          showErrors(error as FieldErrors<TMerchantForm>);
        }
      });
    };
    showErrors(errors);
  };

  const loadingMerchant = isLoadingCreateMerchant || isLoadingUpdateMerchant;

  useEffect(() => {
    if (id && dataMerchantById) {
      reset(dataMerchantById);
    }
  }, [id, dataMerchantById, reset]);

  useEffect(() => {
    if (errorMerchantById) {
      router.push('/merchant-management');
    }
  }, [errorMerchantById, router]);

  return {
    loadingMerchant,
    control,
    errors,
    handleSubmit,
    onSubmit,
    onInvalid,
    dataMerchantById,
    isLoadingMerchantById,
  };
};

const CreateMerchantContext = createContext<ReturnType<typeof useCreateMerchantValue> | undefined>(
  undefined,
);

export const CreateMerchantProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useCreateMerchantValue();
  return <CreateMerchantContext.Provider value={value}>{children}</CreateMerchantContext.Provider>;
};

export const useCreateMerchantHooks = () => {
  const context = useContext(CreateMerchantContext);
  if (context === undefined) {
    throw new Error('CreateMerchantContext must be used within an CreateMerchantProvider');
  }
  return context;
};
export default useCreateMerchantHooks;
