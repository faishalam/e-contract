import { z } from 'zod';

export const contractMetadataSchema = z.object({
  title: z.string().min(1, 'Judul kontrak wajib diisi'),
  party1: z
    .object({})
    .nullable()
    .refine(v => v !== null, {
      message: 'Pihak 1 wajib dipilih',
    }),
  party2: z
    .object({})
    .nullable()
    .refine(v => v !== null, {
      message: 'Pihak 2 wajib dipilih',
    }),
  contractType: z
    .object({})
    .nullable()
    .refine(v => v !== null, {
      message: 'Tipe kontrak wajib dipilih',
    }),
  contractValue: z.string().min(1, 'Nilai kontrak wajib diisi'),
  startDate: z.string().min(1, 'Tanggal mulai wajib diisi'),
  endDate: z.string().min(1, 'Tanggal selesai wajib diisi'),
  picInternal: z
    .object({})
    .nullable()
    .refine(v => v !== null, {
      message: 'PIC Internal wajib dipilih',
    }),
  department: z
    .object({})
    .nullable()
    .refine(v => v !== null, {
      message: 'Department wajib dipilih',
    }),
  template: z.string().min(1, 'Template kontrak wajib dipilih'),
  description: z.string().optional(),
  tags: z.string().optional(),
});
