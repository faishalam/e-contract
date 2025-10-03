'use client';

import { createContext, useContext, useState } from 'react';
import useUserProfile from '@/services/auth/profile';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TChangePasswordForm } from './types';
import { changePasswordSchema } from './validator';
import { toast } from 'react-toastify';
import useChangePassword from '@/services/auth/changePassword';

const useProfileUserHooks = () => {
  const { data: dataProfile, isPending: isLoadingDataProfile } = useUserProfile();
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  });

  const { mutate: mutateChangePassword, isPending: isLoadingChangePassword } = useChangePassword({
    onSuccess: () => {
      toast.success('Kata Sandi Berhasil Diubah');
      setOpenModalChangePassword(false);
      reset();
    },
    onError: (error: unknown) => {
      toast.error(error as string);
      // reset();
    },
  });

  const onSubmit: SubmitHandler<TChangePasswordForm> = data => {
    mutateChangePassword(data);
  };

  const onInvalid = (errors: FieldErrors<TChangePasswordForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
    console.log(errors);
  };

  return {
    isLoadingChangePassword,
    mutateChangePassword,
    onSubmit,
    onInvalid,
    control,
    handleSubmit,
    reset,
    errors,
    openModalChangePassword,
    setOpenModalChangePassword,
    openModalProfile,
    setOpenModalProfile,
    dataProfile,
    isLoadingDataProfile,
  };
};

const UserProfileContext = createContext<ReturnType<typeof useProfileUserHooks> | undefined>(
  undefined,
);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useProfileUserHooks();
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
};

export const useProfileProvider = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useProfileProvider must be used within a UserProfileProvider');
  }
  return context;
};

export default useProfileProvider;
