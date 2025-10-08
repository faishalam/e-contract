'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { partnerSchema, TPartnerForm } from './validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import useCreatePartner from '@/services/partner/useCreatePartner';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import usePartnerList from '@/services/partner/usePartnerList';
import { useDebounce } from '@/utils/useDebounce';
import useUpdatePartner from '@/services/partner/useUpdatePartner';
import usePartnerById from '@/services/partner/usePartnerById';
import useDeletePartner from '@/services/partner/useDeletePartner';
import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import { TPartnerList } from '@/services/partner/types';
import RenderTransactionStatus from '@/components/atoms/render-transaction-status';
import Image from 'next/image';
import EyeIcon from '@/assets/svg/eye-icon.svg';
import IconPencil from '@/assets/svg/icon-pencil.svg';
import DeleteIcon from '@/assets/svg/delete-icon.svg';

const usePartnerManagementHooks = () => {
  const queryClient = useQueryClient();
  const modalWarningInfo = useModalWarningInfo();
  const [mode, setMode] = useState<string>('create');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string>();
  const [openModalPartner, setOpenModalPartner] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState({
    role: '',
    status: '',
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TPartnerForm>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      name: '',
      type: '',
      contact_name: '',
      position: '',
      email: '',
      phone_number: '',
      address: '',
      city: '',
      province: '',
      npwp: '',
    },
    mode: 'onChange',
  });

  const { mutate: mutateCreatePartner, isPending: isLoadingCreatePartner } = useCreatePartner({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['usePartnerList'] });
      setOpenModalPartner(false);
      toast.success('partner Berhasil Ditambahkan');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { data: dataPartnerList, isPending: isLoadingDataPartnerList } = usePartnerList({
    params: {
      page: page,
      limit: limit,
      search: debouncedSearch,
      status: filter.status,
      role: filter.role,
    },
  });

  const { data: dataPartnerById, isPending: isLoadingDataPartnerById } = usePartnerById({
    params: { id: selectedPartnerId ?? '' },
  });

  const { mutate: mutateDeletePartner, isPending: isLoadingDeletePartner } = useDeletePartner({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['usePartnerList'] });
      toast.success('Partner Berhasil Dihapus');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const { mutate: mutateUpdatePartner, isPending: isLoadingUpdatePartner } = useUpdatePartner({
    onSuccess: () => {
      setOpenModalPartner(false);
      toast.success('Partner Berhasil Diubah');
      queryClient.refetchQueries({ queryKey: ['usePartnerList'] });
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit: SubmitHandler<TPartnerForm> = data => {
    if (mode === 'create') {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin menambahkan partner ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateCreatePartner(data);
        },
      });
    }

    if (mode === 'edit') {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin mengubah partner ini?</p>
          </div>
        ),
        onConfirm: () => {
          mutateUpdatePartner({ id: selectedPartnerId ?? '', payload: data });
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<TPartnerForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const partnerColumnDef = useMemo<ColDef<TPartnerList>[]>(() => {
    return [
      {
        width: 90,
        headerName: 'No',
        cellRenderer: (params: ICellRendererParams<TPartnerList>) => {
          const rowIndex = params.node?.rowIndex ?? 0;
          return <span>{rowIndex + 1}</span>;
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        flex: 2,
        cellRenderer: (params: ICellRendererParams<TPartnerList>) => {
          return (
            <div className="flex flex-col">
              <span>{params?.data?.name}</span>
              <span className="text-gray-500 text-[10px]">{params?.data?.email}</span>
            </div>
          );
        },
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 150,
      },
      {
        field: 'contact_name',
        headerName: 'Contact Name',
        width: 200,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        cellRenderer: (params: ICellRendererParams<TPartnerList>) => {
          return (
            <div>
              <RenderTransactionStatus status={params?.data?.status ?? ''} />
            </div>
          );
        },
      },
      {
        width: 120,
        headerName: 'Actions',
        sortable: false,
        pinned: 'right',
        cellRenderer: (params: ICellRendererParams<TPartnerList>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div
                onClick={() => {
                  if (params && params?.data?.id) {
                    setSelectedPartnerId(params.data.id);
                    setOpenModalPartner(true);
                    setMode('view');
                  }
                }}
                className="cursor-pointer"
              >
                <Image src={EyeIcon} alt="edit" />
              </div>

              <div
                onClick={() => {
                  if (params && params.data) {
                    setSelectedPartnerId(params.data.id);
                    setOpenModalPartner(true);
                    setMode('edit');
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
                          <p>Apakah anda yakin ingin menghapus partner ini?</p>
                        </div>
                      ),
                      onConfirm: () => {
                        if (params && params.data?.id) {
                          mutateDeletePartner(params?.data?.id);
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
  }, [dataPartnerList]);

  useEffect(() => {
    if (dataPartnerById && (mode === 'view' || mode === 'edit')) {
      reset(dataPartnerById);
    } else if (mode === 'create') {
      reset();
    }
  }, [dataPartnerById, mode, reset]);

  return {
    isLoadingDeletePartner,
    isLoadingCreatePartner,
    partnerColumnDef,
    dataPartnerList,
    onSubmit,
    onInvalid,
    openModalPartner,
    setOpenModalPartner,
    control,
    handleSubmit,
    watch,
    errors,
    setSelectedPartnerId,
    reset,
    mode,
    setPage,
    setMode,
    search,
    setSearch,
    isLoadingDataPartnerList,
    isLoadingUpdatePartner,
    isLoadingDataPartnerById,
    setFilter,
    filter,
    setLimit,
  };
};

const PartnerManagementContext = createContext<
  ReturnType<typeof usePartnerManagementHooks> | undefined
>(undefined);

export const PartnerManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = usePartnerManagementHooks();
  return (
    <PartnerManagementContext.Provider value={value}>{children}</PartnerManagementContext.Provider>
  );
};

export const usePartnerManagement = () => {
  const context = useContext(PartnerManagementContext);
  if (context === undefined) {
    throw new Error('PartnerManagementContext must be used within an PartnerManagementProvider');
  }
  return context;
};
export default usePartnerManagement;
