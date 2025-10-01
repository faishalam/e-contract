'use client';
import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TMerchantForm } from './types';
import { merchantSchema } from './validator';
import { zodResolver } from '@hookform/resolvers/zod';

const useCreateMerchantHooks = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    reset,
    getValues,
    trigger,
  } = useForm<TMerchantForm>({
    resolver: zodResolver(merchantSchema),
    defaultValues: {
      company_name: '',
      brand_name: null,
      npwm: null,
      nib: null,
      industry: null,
      company_size: null,
      company_address: null,
      city: null,
      province: null,
      postcode: null,
      company_email: '',
      phone_number: '',
      website: '',
      fax: null,
      pic_name: '',
      pic_email: '',
      pic_department: null,
      pic_jabatan: '',
      pic_phone_number: '',
      pic_phone_number_office: null,
    },
    mode: 'onChange',
  });

  return {
    isValid,
    isDirty,
    reset,
    getValues,
    trigger,
    control,
    handleSubmit,
    watch,
    setValue,
    errors,
  };
};

const CreateMerchantContext = createContext<ReturnType<typeof useCreateMerchantHooks> | undefined>(
  undefined,
);

export const CreateMerchantProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useCreateMerchantHooks();
  return <CreateMerchantContext.Provider value={value}>{children}</CreateMerchantContext.Provider>;
};

export const useCreateMerchant = () => {
  const context = useContext(CreateMerchantContext);
  if (context === undefined) {
    throw new Error('CreateMerchantContext must be used within an CreateMerchantProvider');
  }
  return context;
};
export default useCreateMerchant;
