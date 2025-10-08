'use client';
import EyeIcon from '@/assets/svg/eye-icon.svg';
import IconPencil from '@/assets/svg/icon-pencil.svg';
import DeleteIcon from '@/assets/svg/delete-icon.svg';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { createContext, useContext, useMemo, useState } from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import useMerchantList from '@/services/merchant/useMerchantList';
import { TMerchantList } from '@/services/merchant/types';
import { useDebounce } from '@/utils/useDebounce';
import Image from 'next/image';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import useDeleteMerchant from '@/services/merchant/useDeleteMerchant';
import useMerchantStats from '@/services/merchant/useMerchantStatistics';
import useMerchantById from '@/services/merchant/useMerchantById';

const useMerchantManagementHooks = () => {
  const pathName = usePathname();
  const id = useMemo(() => {
    const lastPath = pathName.split('/').pop();
    if (lastPath === 'new') {
      return null;
    }
    if (lastPath === 'merchant-management') {
      return null;
    }
    return lastPath;
  }, [pathName]);
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();
  const [filter, setFilter] = useState({
    status: '',
  });
  const modalWarningInfo = useModalWarningInfo();

  const { data: dataMerchantStats, isPending: isLoadingMerchantStats } = useMerchantStats();

  const { data: dataMerchantList, isPending: isLoadingMerchantList } = useMerchantList({
    params: {
      page: page,
      limit: limit,
      search: debouncedSearch,
      status: filter.status,
    },
  });

  const {
    data: dataMerchantById,
    isLoading: isLoadingMerchantById,
    error: errorMerchantById,
  } = useMerchantById({
    params: {
      id: id ?? null,
    },
  });

  const { mutate: mutateDeleteMerchant, isPending: isLoadingDeleteMerchant } = useDeleteMerchant({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useMerchantStats'] });
      queryClient.refetchQueries({ queryKey: ['useMerchantList'] });
      toast.success('Merchant Berhasil Dihapus');
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const merchantColumnsDef = useMemo<ColDef<TMerchantList>[]>(() => {
    return [
      {
        width: 90,
        headerName: 'No',
        cellRenderer: (params: ICellRendererParams<TMerchantList>) => {
          const rowIndex = params.node?.rowIndex ?? 0;
          return (page - 1) * limit + rowIndex + 1;
        },
      },
      {
        field: 'company_name',
        headerName: 'Nama Perusahaan',
        width: 300,
      },
      {
        field: 'brand_name',
        headerName: 'Nama Brand',
        width: 150,
      },
      {
        field: 'npwp',
        headerName: 'NPWP',
        width: 200,
      },
      {
        field: 'nib',
        headerName: 'NIB',
        width: 150,
      },
      {
        field: 'industry',
        headerName: 'Industri',
        width: 150,
      },
      {
        field: 'company_size',
        headerName: 'Ukuran Perusahaan',
        width: 150,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        cellRenderer: (params: ICellRendererParams<TMerchantList>) => {
          return (
            <div className="py-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full mr-2" />
                {params?.data?.status}
              </span>
            </div>
          );
        },
      },
      {
        width: 120,
        headerName: 'Actions',
        sortable: false,
        pinned: 'right',
        cellRenderer: (params: ICellRendererParams<TMerchantList>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div
                onClick={() => {
                  if (params && params?.data?.id) {
                    router.push(`/merchant-management/detail/${params?.data?.id}`);
                  }
                }}
                className="cursor-pointer"
              >
                <Image src={EyeIcon} alt="edit" />
              </div>

              <div
                onClick={() => {
                  if (params && params.data) {
                    router.push(`/merchant-management/${params.data.id}`);
                  }
                }}
                className="cursor-pointer"
              >
                <Image src={IconPencil} alt="edit" />
              </div>

              <div
                onClick={() => {
                  if (params && params.data) {
                    modalWarningInfo.open({
                      title: 'Konfirmasi',
                      message: (
                        <div>
                          <p>Apakah anda yakin ingin menghapus merchant ini?</p>
                        </div>
                      ),
                      onConfirm: () => {
                        if (params && params.data) {
                          mutateDeleteMerchant(params.data.id);
                        }
                      },
                    });
                  }
                }}
                className="cursor-pointer"
              >
                <Image src={DeleteIcon} alt="edit" />
              </div>
            </div>
          );
        },
      },
    ];
  }, [dataMerchantList]);

  const onCreateNew = () => {
    router.push('/merchant-management/new');
  };

  const loadingMerchant = useMemo(() => {
    return isLoadingMerchantList || isLoadingDeleteMerchant || isLoadingMerchantStats;
  }, [isLoadingMerchantList, isLoadingDeleteMerchant, isLoadingMerchantStats]);

  const statisticsHeader = [
    {
      title: 'Total Merchant',
      icon: <StorefrontIcon className="text-orange-500" />,
      value: dataMerchantStats?.total_merchants ?? 0,
      // conclusion: '↑ 18 merchant baru',
      // trend: 'up' as const,
    },
    {
      title: 'Merchant Active',
      icon: <CheckIcon className="text-blue-500" />,
      value: dataMerchantStats?.active_merchants ?? 0,
      // conclusion: '76.5% dari total merchant',
      // trend: 'neutral' as const,
    },
    {
      title: 'Pending Verifikasi',
      icon: <WatchLaterIcon className="text-green-500" />,
      value: dataMerchantStats?.pending_merchants ?? 0,
      // conclusion: 'Perlu review',
      // trend: 'down' as const,
    },
    {
      title: 'Suspended Merchant',
      icon: <WatchLaterIcon className="text-purple-500" />,
      value: dataMerchantStats?.suspended_merchants ?? 0,
      // conclusion: 'Perlu review',
      // trend: 'down' as const,
    },
    {
      title: 'Total Templates',
      icon: <AttachMoneyIcon className="text-purple-500" />,
      value: dataMerchantStats?.total_templates ?? 0,
      // conclusion: 'Perlu review',
      // trend: 'down' as const,
    },
    // {
    //   title: 'Trial Berakhir',
    //   icon: <WarningIcon className="text-purple-500" />,
    //   value: 234,
    //   conclusion: 'Dalam 7 Hari',
    //   trend: 'neutral' as const,
    // },
    // {
    //   title: 'Revenue Bulanan',
    //   icon: <AttachMoneyIcon className="text-purple-500" />,
    //   value: dataMerchantStats?.,
    //   conclusion: '↑ 22% MoM',
    //   trend: 'neutral' as const,
    // },
  ];

  return {
    dataMerchantById,
    isLoadingMerchantById,
    loadingMerchant,
    setPage,
    statisticsHeader,
    dataMerchantList,
    merchantColumnsDef,
    onCreateNew,
    setSearch,
    filter,
    setFilter,
    search,
    errorMerchantById,
    isLoadingMerchantList,
    limit,
    setLimit,
  };
};

const MerchantManagementContext = createContext<
  ReturnType<typeof useMerchantManagementHooks> | undefined
>(undefined);

export const MerchantManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useMerchantManagementHooks();
  return (
    <MerchantManagementContext.Provider value={value}>
      {children}
    </MerchantManagementContext.Provider>
  );
};

export const useMerchantManagement = () => {
  const context = useContext(MerchantManagementContext);
  if (context === undefined) {
    throw new Error('MerchantManagementContext must be used within an MerchantManagementProvider');
  }
  return context;
};
export default useMerchantManagement;
