'use client';

import { createContext, useContext, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLoginUser from '@/services/auth/login';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {
  activateEmailSchema,
  forgotPasswordSchema,
  loginSchema,
  resendOtpSchema,
  TActivateEmailForm,
  TForgotPasswordForm,
  TLoginForm,
  TResendForm,
  TVerifyOtpForm,
  verifyOtpSchema,
} from './validator';
import { toast } from 'sonner';
import { TLoginResponse } from '@/services/auth/types';
import useSendOtp from '@/services/auth/sendOtp';
import useVerifyOtp from '@/services/auth/verifyOtp';
import useResendOtp from '@/services/auth/resendOtp';
import useForgotPassword from '@/services/auth/forgotPassword';

const useLoginHooks = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    resetField,
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit: handleSubmitActivate,
    formState: { errors: errorsActivate },
    reset: resetActivate,
    control: controlActivate,
    getValues: getValuesActivate,
  } = useForm<TActivateEmailForm>({
    resolver: zodResolver(activateEmailSchema),
    defaultValues: {
      email: '',
    },
  });
  const valuesActivate = getValuesActivate();

  const {
    handleSubmit: handleSubmitVerify,
    formState: { errors: errorsVerify },
    reset: resetVerify,
    control: controlVerify,
    watch: watchVerify,
  } = useForm<TVerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });
  const {
    handleSubmit: handleSubmitResend,
    formState: { errors: errorsResend },
    reset: resetResend,
    control: controlResend,
  } = useForm<TResendForm>({
    resolver: zodResolver(resendOtpSchema),
    defaultValues: {
      email: '',
      purpose: 'login',
    },
  });
  const {
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    reset: resetForgot,
    control: controlForgot,
  } = useForm<TForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const [openModalActivateEmail, setOpenModalAtivateEmail] = useState<boolean>(false);
  const [openModalForgotPassword, setOpenModalForgotPassword] = useState<boolean>(false);

  const { mutate: mutateLogin, isPending: isLoadingLogin } = useLoginUser({
    onSuccess: (data: TLoginResponse) => {
      if (!data) return;
      Cookies.set('accessToken', data.access_token, {
        expires: 7,
        sameSite: 'lax',
        path: '/',
      });
      Cookies.set('refreshToken', data.refresh_token, {
        expires: 7,
        sameSite: 'lax',
        path: '/',
      });
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      toast.error(error as string);
      // reset();
    },
  });

  const { mutate: mutateSendOtp, isPending: isLoadingSendOtp } = useSendOtp({
    onSuccess: () => {
      toast.success('Otp berhasil di kirim, silahkan check email anda');
      router.push('/activation');
      setOpenModalAtivateEmail(false);
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateVerifyOtp, isPending: isLoadingVerify } = useVerifyOtp({
    onSuccess: () => {
      toast.success('Otp berhasil di verifikasi, silahkan login kembali');
      router.push('/login');
      resetActivate();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateResend, isPending: isLoadingResend } = useResendOtp({
    onSuccess: data => {
      toast.success(data.message);
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateForgot, isPending: isLoadingForgot } = useForgotPassword({
    onSuccess: () => {
      toast.success('Password berhasil di reset, silahkan check email anda');
      router.push('/reset-password');
      setOpenModalForgotPassword(false);
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit: SubmitHandler<TLoginForm> = data => {
    mutateLogin(data);
  };

  const onSubmitActivate: SubmitHandler<TActivateEmailForm> = data => {
    mutateSendOtp(data);
  };

  const onSubmitVerify: SubmitHandler<TVerifyOtpForm> = data => {
    const payload = {
      email: valuesActivate.email,
      otp: data.otp,
    };

    console.log(payload);
    mutateVerifyOtp({
      email: valuesActivate.email,
      otp: data.otp,
    });
  };

  const onSubmitResend: SubmitHandler<TResendForm> = () => {
    mutateResend({ email: valuesActivate.email });
  };

  const onSubmitForgot: SubmitHandler<TForgotPasswordForm> = data => {
    mutateForgot(data);
  };

  const onInvalid = (errors: FieldErrors<TLoginForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onInvalidActivate = (errors: FieldErrors<TActivateEmailForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onInvalidVerify = (errors: FieldErrors<TVerifyOtpForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onInvalidResend = (errors: FieldErrors<TResendForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const onInvalidForgot = (errors: FieldErrors<TForgotPasswordForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };
  return {
    isLoadingSendOtp,
    onSubmitActivate,
    isLoadingLogin,
    onInvalidActivate,
    handleSubmit,
    errors,
    reset,
    control,
    resetField,
    onSubmit,
    onInvalid,
    getValuesActivate,
    openModalActivateEmail,
    setOpenModalAtivateEmail,
    resetActivate,
    handleSubmitActivate,
    errorsActivate,
    controlActivate,
    mutateVerifyOtp,
    isLoadingVerify,
    handleSubmitVerify,
    errorsVerify,
    resetVerify,
    controlVerify,
    watchVerify,
    onInvalidVerify,
    onSubmitVerify,
    handleSubmitResend,
    errorsResend,
    resetResend,
    controlResend,
    onInvalidResend,
    onSubmitResend,
    isLoadingResend,
    handleSubmitForgot,
    errorsForgot,
    resetForgot,
    controlForgot,
    onInvalidForgot,
    onSubmitForgot,
    isLoadingForgot,
    openModalForgotPassword,
    setOpenModalForgotPassword,
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
