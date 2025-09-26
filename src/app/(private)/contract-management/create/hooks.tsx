'use client';

import { createContext, useContext, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSearchParams } from 'next/navigation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useForm } from 'react-hook-form';
import { TContractForm } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { contractMetadataSchema } from './schema';
import { toast } from 'react-toastify';
import useFormPersist from 'react-hook-form-persist';

const useCreateContractHooks = () => {
  const [stepNav, setStepNav] = useState<string>('');
  const steps = [
    { label: 'Metadata', path: 'metadata', icon: DescriptionIcon },
    { label: 'Konten', path: 'content', icon: EditIcon },
    { label: 'Persetujuan', path: 'approval', icon: VerifiedUserIcon },
    { label: 'Final', path: 'final', icon: DoneAllIcon },
  ];
  const paramsStep = useSearchParams();
  const step = paramsStep.get('step') || 'metadata';

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    reset,
    getValues,
    trigger,
  } = useForm<TContractForm>({
    resolver: zodResolver(contractMetadataSchema),
    defaultValues: {
      title: '',
      party1: null,
      party2: null,
      contractType: null,
      contractValue: '',
      startDate: '',
      endDate: '',
      picInternal: null,
      department: null,
      // template: '',
      description: '',
      tags: '',
    },
  });

  const validateStep = async (currentStep: string) => {
    let fieldsToValidate: (keyof TContractForm)[] = [];

    if (currentStep === 'metadata') {
      fieldsToValidate = [
        'title',
        'party1',
        'party2',
        'contractType',
        'contractValue',
        'startDate',
        'endDate',
        'picInternal',
        'department',
        // "template", // kalau sudah dipakai
      ];
    }

    // if (currentStep === 'content') {
    //   fieldsToValidate = ['content']; // sesuaikan field di contentForm
    // }

    // if (currentStep === 'approval') {
    //   fieldsToValidate = ['approvers']; // sesuaikan
    // }

    try {
      await trigger(fieldsToValidate);
      const hasError = fieldsToValidate.some(f => !!errors[f]);
      if (hasError) {
        toast.error('Lengkapi form sebelum melanjutkan');
        return false;
      }
      return true;
    } catch {
      toast.error('Lengkapi form sebelum melanjutkan');
      return false;
    }
  };

  useFormPersist('create-contract-form', {
    watch,
    setValue,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  return {
    validateStep,
    getValues,
    stepNav,
    setStepNav,
    steps,
    paramsStep,
    step,
    control,
    handleSubmit,
    watch,
    setValue,
    errors,
    isValid,
    isDirty,
    reset,
    trigger,
  };
};

const CreateContractContext = createContext<ReturnType<typeof useCreateContractHooks> | undefined>(
  undefined,
);

export const CreateContractProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useCreateContractHooks();
  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>;
};

export const useCreateContract = () => {
  const context = useContext(CreateContractContext);
  if (context === undefined) {
    throw new Error('CreateContractContext must be used within an CreateContractProvider');
  }
  return context;
};

export default useCreateContract;
