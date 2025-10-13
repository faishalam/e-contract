'use client';
import { createContext, useContext, useState } from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckIcon from '@mui/icons-material/Check';
import { useDebounce } from '@/utils/useDebounce';
import { useRouter } from 'next/navigation';
import useContractTypeList from '@/services/master/master-contract-type/useContractTypeList';
import useTemplateList from '@/services/template/useTemplateList';
import useTemplateById from '@/services/template/useTemplateById';
import useDeleteTemplate from '@/services/template/useDeleteTemplate';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const useTemplateManagementValue = () => {
  const queryClient = useQueryClient();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [openModalTemplate, setOpenModalTemplate] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('');
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState({
    status: '',
  });

  const { data: dataContractTypeList } = useContractTypeList({
    params: {
      page: 1,
      limit: 10,
    },
  });

  const { data: dataTemplateList, isPending: isLoadingDataTemplateList } = useTemplateList({
    params: {
      search: debouncedSearch,
      page: page,
      limit: limit,
      status: filter.status,
    },
  });

  const { data: dataTemplateById, isPending: isLoadingDataTemplateById } = useTemplateById({
    params: {
      id: selectedTemplateId,
    },
  });

  const { mutate: mutateDeleteTemplate, isPending: isLoadingDeleteTemplate } = useDeleteTemplate({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useTemplateList'] });
      toast.success('Template berhasil dihapus');
      setSelectedTemplateId('');
    },
    onError: () => {
      toast.success('Template berhasil dihapus');
      setSelectedTemplateId('');
    },
  });

  const statisticsHeader = [
    {
      title: 'Total Template',
      icon: <StorefrontIcon className="text-orange-500" />,
      value: 10,
    },
    {
      title: 'Template Aktif',
      icon: <CheckIcon className="text-blue-500" />,
      value: 19,
    },
    {
      title: 'Sering Digunakan',
      icon: <WatchLaterIcon className="text-green-500" />,
      value: 10,
    },
    {
      title: 'Perlu Review',
      icon: <WatchLaterIcon className="text-purple-500" />,
      value: 19,
    },
  ];

  const onCreateNew = () => {
    setMode('create');
    router.push('/template-management/new');
  };
  return {
    isLoadingDeleteTemplate,
    selectedTemplateId,
    setSelectedTemplateId,
    search,
    setSearch,
    statisticsHeader,
    dataContractTypeList,
    openModalTemplate,
    setOpenModalTemplate,
    onCreateNew,
    filter,
    setFilter,
    isLoadingDataTemplateList,
    dataTemplateList,
    mode,
    setMode,
    dataTemplateById,
    isLoadingDataTemplateById,
    mutateDeleteTemplate,
    setPage,
    setLimit,
  };
};

const TemplateManagementContext = createContext<
  ReturnType<typeof useTemplateManagementValue> | undefined
>(undefined);

export const TemplateManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useTemplateManagementValue();
  return (
    <TemplateManagementContext.Provider value={value}>
      {children}
    </TemplateManagementContext.Provider>
  );
};

export const useTemplateManagementHooks = () => {
  const context = useContext(TemplateManagementContext);
  if (context === undefined) {
    throw new Error('TemplateManagementContext must be used within an TemplateManagementProvider');
  }
  return context;
};
export default useTemplateManagementHooks;
