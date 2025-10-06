import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.string().min(1, 'Email perusahaan wajib diisi').email('Format email tidak valid'),
  code: z.string().min(1, 'OTP wajib diisi'),
  new_password: z.string().min(6, 'Password baru wajib diisi'),
  confirm_password: z.string().min(6, 'Password baru wajib diisi'),
});

export type TResetPasswordForm = z.infer<typeof resetPasswordSchema>;
