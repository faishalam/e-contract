import { z } from 'zod';

export const baseUserSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  username: z.string().min(1, { message: 'Username wajib diisi' }),
  name: z.string().min(1, { message: 'Nama wajib diisi' }),
  phone: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  is_active: z.boolean().default(true),
});

// Schema untuk CREATE (password wajib)
export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(1, { message: 'Password wajib diisi' }),
});

// Schema untuk EDIT (password opsional / tidak dikirim)
export const updateUserSchema = baseUserSchema.extend({
  password: z.string().optional(),
});

export type TCreateUserForm = z.infer<typeof createUserSchema>;
export type TUpdateUserForm = z.infer<typeof updateUserSchema>;
export type TUserForm = TCreateUserForm | TUpdateUserForm;
