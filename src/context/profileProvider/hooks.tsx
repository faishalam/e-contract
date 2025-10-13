'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import useUserProfile from '@/services/auth/profile';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  changePasswordSchema,
  TChangePasswordForm,
  TUpdateProfileForm,
  updateProfileSchema,
} from './validator';
import { toast } from 'sonner';
import useChangePassword from '@/services/auth/changePassword';
import useUpdateProfile from '@/services/auth/useUpdateProfile';
import { useQueryClient } from '@tanstack/react-query';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';

const useProfileUserHooks = () => {
  const modalWarningInfo = useModalWarningInfo();
  const queryClient = useQueryClient();
  const { data: dataProfile, isPending: isLoadingDataProfile } = useUserProfile();
  const [openModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [openModalUpdateProfile, setOpenModalUpdateProfile] = useState<boolean>(false);
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

  const {
    control: controlUpdateProfile,
    handleSubmit: handleSubmitUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    reset: resetUpdateProfile,
  } = useForm<TUpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      phone: '',
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

  const { mutate: mutateUpdateProfile, isPending: isLoadingUpdateProfile } = useUpdateProfile({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useUserProfile'] });
      toast.success('Profil Berhasil Diubah');
      setOpenModalProfile(false);
      setOpenModalUpdateProfile(false);
      reset();
    },
    onError: (error: unknown) => {
      toast.error(error as string);
    },
  });

  const onSubmitUpdateProfile: SubmitHandler<TUpdateProfileForm> = data => {
    modalWarningInfo.open({
      message: 'Apakah kamu yakin ingin mengubah data profil Anda?',
      onConfirm: () => {
        mutateUpdateProfile(data);
      },
    });
  };

  const onInvalidUpdateProfile = (errors: FieldErrors<TChangePasswordForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onSubmit: SubmitHandler<TChangePasswordForm> = data => {
    modalWarningInfo.open({
      message: 'Apakah kamu yakin ingin mengubah kata sandi Anda?',
      onConfirm: () => {
        mutateChangePassword(data);
      },
    });
  };

  const onInvalid = (errors: FieldErrors<TChangePasswordForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  useEffect(() => {
    if (dataProfile && openModalUpdateProfile) {
      resetUpdateProfile({
        name: dataProfile.name,
        phone: dataProfile.phone,
      });
    }
  }, [openModalUpdateProfile]);

  return {
    onSubmitUpdateProfile,
    onInvalidUpdateProfile,
    controlUpdateProfile,
    handleSubmitUpdateProfile,
    errorsUpdateProfile,
    isLoadingUpdateProfile,
    mutateUpdateProfile,
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
    openModalUpdateProfile,
    setOpenModalUpdateProfile,
  };
};

const UserProfileContext = createContext<ReturnType<typeof useProfileUserHooks> | undefined>(
  undefined,
);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useProfileUserHooks();
  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
};

export const useProfileGlobal = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useProfileGlobal must be used within a UserProfileProvider');
  }
  return context;
};

export default useProfileGlobal;
