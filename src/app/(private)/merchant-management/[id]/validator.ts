import { z } from 'zod';

export const merchantSchema = z.object({
  company_name: z.string().min(1, { message: 'Nama perusahaan wajib diisi' }),
  brand_name: z.string().min(1, { message: 'Brand wajib diisi' }),
  npwp: z.string().min(1, { message: 'NPWP wajib diisi' }),
  nib: z.string().min(13, { message: 'NIB Minimal 13 Karakter' }),
  industry: z.string().min(1, { message: 'Industri wajib diisi' }),
  company_size: z.string().min(1, { message: 'Ukuran perusahaan wajib diisi' }),
  status: z.string().optional().nullable(),

  profile: z.object({
    address: z.string().min(1, { message: 'Alamat wajib diisi' }),
    city: z.string().min(1, { message: 'Kota wajib diisi' }),
    province: z.string().min(1, { message: 'Provinsi wajib diisi' }),
    postal_code: z.string().min(1, { message: 'Kode pos wajib diisi' }),
    website: z.string().min(1, { message: 'Website wajib diisi' }),
    company_email: z
      .string()
      .email({ message: 'Email perusahaan tidak valid' })
      .min(1, { message: 'Email perusahaan wajib diisi' }),
    company_phone: z.string().min(1, { message: 'Nomor telepon perusahaan wajib diisi' }),
    fax: z.string().min(1, { message: 'Nomor fax wajib diisi' }),
    joined_date: z.string().min(1, { message: 'Tanggal bergabung wajib diisi' }),
    renewal_date: z.string().min(1, { message: 'Tanggal perpanjangan wajib diisi' }),
    plan: z.string().min(1, { message: 'Paket wajib diisi' }),
    price: z.string().optional().nullable(),
  }),

  pic: z.object({
    name: z.string().min(1, { message: 'Nama PIC wajib diisi' }),
    email: z
      .string()
      .email({ message: 'Email PIC tidak valid' })
      .min(1, { message: 'Email PIC wajib diisi' }),
    phone: z.string().min(1, { message: 'Nomor telepon PIC wajib diisi' }),
    office_phone: z.string().min(1, { message: 'Nomor telepon kantor PIC wajib diisi' }),
    position: z.string().min(1, { message: 'Jabatan PIC wajib diisi' }),
    department: z.string().min(1, { message: 'Departemen wajib diisi' }),
  }),
});

export type TMerchantForm = z.infer<typeof merchantSchema>;
