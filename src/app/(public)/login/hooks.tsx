'use client';

import { createContext, useContext } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { TLoginForm } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
import useLoginUser from '@/services/auth/login';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { loginSchema } from './validator';
import { toast } from 'react-toastify';
import { TLoginResponse } from '@/services/auth/types';

const useLoginHooks = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    resetField,
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { mutate: mutateLogin, isPending: isLoadingLogin } = useLoginUser({
    onSuccess: (data: TLoginResponse) => {
      if (!data) return;
      Cookies.set('accessToken', data.tokens.accessToken, {
        expires: 7,
        sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      Cookies.set('refreshToken', data.tokens.refreshToken, {
        expires: 7,
        sameSite: 'lax',
        // secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      toast.error(error as string);
      // reset();
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = data => {
    mutateLogin(data);
  };

  const onInvalid = (errors: FieldErrors<TLoginForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        // toast.error(error.message);
      }
    });
    console.log(errors);
  };
  return {
    isLoadingLogin,
    register,
    handleSubmit,
    errors,
    reset,
    control,
    resetField,
    onSubmit,
    onInvalid,
  };
};

const LoginContext = createContext<ReturnType<typeof useLoginHooks> | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useLoginHooks();
  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export default useLogin;
