import { z } from 'zod';

export const partnerSchema = z.object({
  id: z.string().optional(),
  merchant_id: z.string().optional(),
  name: z.string().min(1, { message: 'Nama perusahaan wajib diisi' }),
  type: z.string().min(1, { message: 'Tipe wajib diisi' }),
  contact_name: z.string().min(1, { message: 'Nama kontak wajib diisi' }),
  position: z.string().min(1, { message: 'Jabatan wajib diisi' }),
  email: z
    .string()
    .min(1, { message: 'Email wajib diisi' })
    .email({ message: 'Format email tidak valid' }),
  phone_number: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  address: z.string().min(1, { message: 'Alamat wajib diisi' }),
  city: z.string().min(1, { message: 'Kota wajib diisi' }),
  province: z.string().min(1, { message: 'Provinsi wajib diisi' }),
  npwp: z.string().min(1, { message: 'Tipe wajib diisi' }),
});

export type TPartnerForm = z.infer<typeof partnerSchema>;
