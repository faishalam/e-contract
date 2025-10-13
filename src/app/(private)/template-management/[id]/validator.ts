import { z } from 'zod';

export const templateSchema = z.object({
  template_name: z.string().min(1, { message: 'Nama template wajib diisi' }),
  description: z.string().min(1, { message: 'Deskripsi wajib diisi' }),
  content: z.string().min(1, { message: 'Konten wajib diisi' }),
  google_docs_id: z.string().min(1, { message: 'ID Google Docs wajib diisi' }),
});

export type TTemplateForm = z.infer<typeof templateSchema>;
