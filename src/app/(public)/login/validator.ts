import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email perusahaan wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export const activateEmailSchema = z.object({
  email: z.string().min(1, 'Email perusahaan wajib diisi').email('Format email tidak valid'),
});

export const verifyOtpSchema = z.object({
  email: z.string().optional(),
  otp: z.string().min(1, 'OTP wajib diisi'),
});

export const resendOtpSchema = z.object({
  email: z.string().min(1, 'Email tidak ditemukan').email('Format email tidak valid'),
  purpose: z.string().min(1, 'Tujuan wajib diisi'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email perusahaan wajib diisi').email('Format email tidak valid'),
});

export type TLoginForm = z.infer<typeof loginSchema>;
export type TActivateEmailForm = z.infer<typeof activateEmailSchema>;
export type TVerifyOtpForm = z.infer<typeof verifyOtpSchema>;
export type TResendForm = z.infer<typeof resendOtpSchema>;
export type TForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
