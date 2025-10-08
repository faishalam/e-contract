import { z } from 'zod';

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, { message: 'Password lama wajib diisi' }),
  new_password: z.string().min(1, { message: 'Password baru wajib diisi' }),
  confirm_password: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
});
export type TChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1, { message: 'Nama wajib diisi' }),
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
});

export type TUpdateProfileForm = z.infer<typeof updateProfileSchema>;
