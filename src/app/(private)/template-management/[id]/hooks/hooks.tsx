'use client';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { templateSchema, TTemplateForm } from '../validator';
import useCreateTemplate from '@/services/template/useCreateTemplate';
import useUpdateTemplate from '@/services/template/useUpdateTemplate';
import useTemplateById from '@/services/template/useTemplateById';
import useGoogleDocs from './useGDocsHooks';

const useTemplateValue = () => {
  const pathName = usePathname();
  const id = useMemo(() => {
    const lastPath = pathName.split('/').pop();
    if (lastPath === 'new') {
      return null;
    }
    if (lastPath === 'template-management') {
      return null;
    }
    return lastPath;
  }, [pathName]);
  const modalWarningInfo = useModalWarningInfo();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    exportDocumentAsHTML,
    clearTokens,
    googleToken,
    documentId,
    getGoogleDoc,
    setDocumentId,
  } = useGoogleDocs();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TTemplateForm>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      template_name: '',
      description: '',
      content: '',
    },
    mode: 'onChange',
  });

  const { mutate: mutateCreateTemplate, isPending: isLoadingCreateTemplate } = useCreateTemplate({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useTemplateList'] });
      router.push('/template-management');
      toast.success('Template berhasil dibuat');
      reset();
      clearTokens();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { data: dataTemplateById } = useTemplateById({
    params: {
      id: id,
    },
  });

  const { mutate: mutateUpdateTemplate, isPending: isLoadingUpdateTemplate } = useUpdateTemplate({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useTemplateList'] });
      queryClient.refetchQueries({ queryKey: ['useTemplateById', id] });
      router.push('/template-management');
      toast.success('Template Berhasil Diperbarui');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit = async () => {
    if (!googleToken || !documentId) return;
    const htmlContent = await exportDocumentAsHTML(googleToken, documentId);
    const getDoc = await getGoogleDoc(googleToken, documentId);

    const payload: TTemplateForm = {
      template_name: getDoc.title,
      description: 'test',
      content: htmlContent as string,
      google_docs_id: documentId,
    };

    if (!id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin menambahkan Template ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateCreateTemplate(payload);
        },
      });
    }

    if (id) {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin mengubah Template ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateUpdateTemplate({ id: id || '', payload: payload });
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<TTemplateForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  useEffect(() => {
    if (dataTemplateById) {
      reset(dataTemplateById);
      setDocumentId(dataTemplateById.google_docs_id);
      localStorage.setItem('documentId', dataTemplateById.google_docs_id);
    }
  }, [dataTemplateById]);

  return {
    control,
    id,
    handleSubmit,
    setValue,
    errors,
    isLoadingCreateTemplate,
    isLoadingUpdateTemplate,
    mutateCreateTemplate,
    mutateUpdateTemplate,
    onSubmit,
    onInvalid,
    dataTemplateById,
  };
};

const TemplateContext = createContext<ReturnType<typeof useTemplateValue> | undefined>(undefined);

export const TemplateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useTemplateValue();
  return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
};

export const useTemplateHooks = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('TemplateContext must be used within an TemplateProvider');
  }
  return context;
};
export default useTemplateHooks;
