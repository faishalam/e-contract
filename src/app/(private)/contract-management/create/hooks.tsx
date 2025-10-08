'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { usePathname, useSearchParams } from 'next/navigation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contractMetadataSchema, TContractForm } from './validator';
import { toast } from 'sonner';
import useFormPersist from 'react-hook-form-persist';
import useCreateContract from '@/services/contract/useCreateContract';
import useUpdateContract from '@/services/contract/useUpdateContract';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';

const useCreateContractValue = () => {
  const modalWarningInfo = useModalWarningInfo();
  const pathName = usePathname();
  const [stepNav, setStepNav] = useState<string>('');
  const steps = [
    { label: 'Metadata', path: 'metadata', icon: DescriptionIcon },
    { label: 'Konten', path: 'content', icon: EditIcon },
    { label: 'Persetujuan', path: 'approval', icon: VerifiedUserIcon },
    { label: 'Final', path: 'final', icon: DoneAllIcon },
  ];
  const paramsStep = useSearchParams();
  const step = paramsStep.get('step') || 'metadata';

  const id = useMemo(() => {
    const lastPath = pathName.split('/').pop();
    if (lastPath === 'new') {
      return null;
    }
    return lastPath;
  }, [pathName]);

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
    mode: 'onChange',
  });

  const { mutate: mutateCreateContract, isPending: isLoadingCreateContract } = useCreateContract({
    onSuccess: () => {
      toast.success('Contract Berhasil Ditambahkan');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateUpdateContract, isPending: isLoadingUpdateContract } = useUpdateContract({
    onSuccess: () => {
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit: SubmitHandler<TContractForm> = data => {
    if (!id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin menambahkan Merchant ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateCreateContract(data);
        },
      });
    }

    if (id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin mengubah Merchant ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateUpdateContract({ id: id || '', payload: data });
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<TContractForm>) => {
    const showErrors = (errObj: FieldErrors<TContractForm>) => {
      Object.values(errObj).forEach(error => {
        if (!error) return;
        if (typeof error === 'object' && error !== null) {
          if ('message' in error && error.message) {
            toast.error(String(error.message));
          }
          showErrors(error as FieldErrors<TContractForm>);
        }
      });
    };
    showErrors(errors);
  };

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
    onInvalid,
    onSubmit,
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
    isLoadingCreateContract,
    isLoadingUpdateContract,
    setValue,
    errors,
    isValid,
    isDirty,
    reset,
    trigger,
  };
};

const CreateContractContext = createContext<ReturnType<typeof useCreateContractValue> | undefined>(
  undefined,
);

export const CreateContractProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useCreateContractValue();
  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>;
};

export const useCreateContractHooks = () => {
  const context = useContext(CreateContractContext);
  if (context === undefined) {
    throw new Error('CreateContractContext must be used within an CreateContractProvider');
  }
  return context;
};

export default useCreateContractHooks;
