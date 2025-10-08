'use client';

import useResetPasswordAPI from '@/services/auth/resetPassword';
import { createContext, useContext } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, TResetPasswordForm } from './validator';
import { useRouter } from 'next/navigation';

const useResetPasswordHooks = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<TResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      otp: '',
      new_password: '',
      confirm_password: '',
    },
  });
  const router = useRouter();

  const { mutate: mutateResetPassword, isPending: isLoadingResetPassword } = useResetPasswordAPI({
    onSuccess: () => {
      router.push('/login');
      toast.success('Password berhasil di ubah, silahkan login kembali');
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit = (data: TResetPasswordForm) => {
    mutateResetPassword(data);
  };

  const onInvalid = (errors: FieldErrors<TResetPasswordForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return {
    onSubmit,
    onInvalid,
    isLoadingResetPassword,
    handleSubmit,
    control,
    errors,
    watch,
  };
};

const ResetPasswordContext = createContext<ReturnType<typeof useResetPasswordHooks> | undefined>(
  undefined,
);

export const ResetPasswordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useResetPasswordHooks();
  return <ResetPasswordContext.Provider value={value}>{children}</ResetPasswordContext.Provider>;
};

export const useResetPassword = () => {
  const context = useContext(ResetPasswordContext);
  if (context === undefined) {
    throw new Error('useResetPassword must be used within a ResetPasswordProvider');
  }
  return context;
};

export default useResetPassword;
