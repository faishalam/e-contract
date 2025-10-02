import { z } from 'zod';

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, { message: 'Password lama wajib diisi' }),
  new_password: z.string().min(1, { message: 'Password baru wajib diisi' }),
  confirm_password: z.string().min(1, { message: 'Konfirmasi password wajib diisi' }),
});
export type TChangePasswordForm = z.infer<typeof changePasswordSchema>;
