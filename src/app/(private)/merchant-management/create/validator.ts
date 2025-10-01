import { z } from 'zod';

export type TOption = {
  value: string;
  label: string;
};

const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const merchantSchema = z.object({
  company_name: z.string().min(1, { message: 'Nama perusahaan wajib diisi' }),
  brand_name: z.string().nullable(),
  npwm: z.number().nullable(),
  nib: z.number().nullable(),
  industry: optionSchema.nullable(),
  company_size: optionSchema.nullable(),
  company_address: optionSchema.nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  postcode: z.number().nullable(),

  company_email: z.string().email().nullable(),
  phone_number: z.string().min(1, { message: 'Nomor telepon wajib diisi' }),
  website: z.string().nullable(),
  fax: z.number().nullable(),

  pic_name: z.string().min(1, { message: 'Nama PIC wajib diisi' }),
  pic_email: z.string().email().min(1, { message: 'Email PIC wajib diisi' }),
  pic_department: z.string().nullable(),
  pic_jabatan: z.string().min(1, { message: 'Jabatan PIC wajib diisi' }),
  pic_phone_number: z.string().min(1, { message: 'Nomor telepon PIC wajib diisi' }),
  pic_phone_number_office: z.string().nullable(),
});

export type TMerchantForm = z.infer<typeof merchantSchema>;
