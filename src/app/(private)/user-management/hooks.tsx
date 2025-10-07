'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TUser, TUserForm, TUserListCol } from './types';
import { ICellRendererParams } from '@ag-grid-community/core';
import Image from 'next/image';
import useUserList from '@/services/user/useUserList';
import EyeIcon from '@/assets/svg/eye-icon.svg';
import IconPencil from '@/assets/svg/icon-pencil.svg';
import DeleteIcon from '@/assets/svg/delete-icon.svg';
import useUserById from '@/services/user/useUserById';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema, updateUserSchema } from './validator';
import useCreateUser from '@/services/user/useCreateUser';
import { toast } from 'react-toastify';
import useUpdateUser from '@/services/user/useUpdateUser';
import useDeleteUser from '@/services/user/useDeleteUser';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { useDebounce } from '@/utils/useDebounce';
import { useQueryClient } from '@tanstack/react-query';

const useUserManagementHooks = () => {
  const queryClient = useQueryClient();
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('view');
  const [activeTab, setActiveTab] = useState<string>('All Users');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openModalUser, setOpenModalUser] = useState(false);
  const modalWarningInfo = useModalWarningInfo();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const limit = 9;
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState({
    role: '',
    status: '',
  });

  const activities = [
    { value: '1,247', label: 'Total Activities', color: 'text-black' },
    { value: '328', label: 'Contract Activities', color: 'text-orange-500' },
    { value: '156', label: 'User Activities', color: 'text-blue-500' },
    { value: '89', label: 'Signing Activities', color: 'text-green-500' },
    { value: '45', label: "Today's Activities", color: 'text-purple-500' },
  ];

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TUserForm>({
    resolver: zodResolver(mode === 'create' ? createUserSchema : updateUserSchema),
    defaultValues: {
      email: '',
      username: '',
      name: '',
      phone: '',
      password: '',
      is_active: true,
    },
    mode: 'onChange',
  });
  // create
  const { mutate: mutateCreateUser, isPending: isLoadingCreateUser } = useCreateUser({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useUserList'] });
      setOpenModalUser(false);
      toast.success('User Berhasil Ditambahkan');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });
  // read
  const { data: usersData, isPending: isLoadingUsers } = useUserList({
    params: {
      page: page,
      limit: limit,
      search: debouncedSearch,
      status: filter.status,
      role: filter.role,
    },
  });
  // detail
  const { data: usersDataById, isPending: isLoadingUsersById } = useUserById({
    params: { id: selectedUserId ?? '' },
  });
  // update
  const { mutate: mutateUpdateUser, isPending: isLoadingUpdateUser } = useUpdateUser({
    onSuccess: () => {
      toast.success('User Berhasil Diubah');
      setOpenModalUser(false);
      queryClient.refetchQueries({ queryKey: ['useUserList'] });
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });
  // delete
  const { mutate: mutateDeleteUser, isPending: isLoadingDeleteUser } = useDeleteUser({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['useUserList'] });
      toast.success('User Berhasil Dihapus');
      reset();
    },
    onError: error => {
      toast.error(error as string);
    },
  });

  const onSubmit: SubmitHandler<TUserForm> = data => {
    if (mode === 'create') {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin menambahkan user ini?</p>
          </div>
        ),
        onConfirm: () => {
          const payload = {
            email: data.email,
            username: data.username,
            name: data.name,
            phone: data.phone,
            password: data.password,
          };
          mutateCreateUser(payload);
        },
      });
    }

    if (mode === 'edit') {
      modalWarningInfo.open({
        title: 'Konfirmasi',
        message: (
          <div>
            <p>Apakah anda yakin ingin mengubah user ini?</p>
          </div>
        ),
        onConfirm: () => {
          const payload = {
            email: data.email,
            username: data.username,
            name: data.name,
            phone: data.phone,
          };
          mutateUpdateUser({ id: selectedUserId || '', payload });
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<TUserForm>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(errors).forEach(([_, error]) => {
      // console.log(key);
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  const usersColumnsDef = useMemo<TUserListCol[]>(() => {
    return [
      {
        width: 90,
        headerName: 'No',
        cellRenderer: (params: ICellRendererParams<TUser>) => {
          const rowIndex = params.node?.rowIndex ?? 0;
          return (page - 1) * limit + rowIndex + 1;
        },
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 250,
      },
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
      },
      { field: 'name', headerName: 'Name', flex: 2 },
      { field: 'phone', headerName: 'Phone', flex: 1 },
      {
        field: 'is_active',
        headerName: 'Active',
        flex: 1,
        cellRenderer: (params: ICellRendererParams<TUser>) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              params.data?.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {params.data?.is_active ? 'Aktif' : 'Tidak Aktif'}
          </span>
        ),
      },
      { field: 'role', headerName: 'Role' },
      {
        width: 120,
        headerName: 'Actions',
        sortable: false,
        pinned: 'right',
        cellRenderer: (params: ICellRendererParams<TUser>) => {
          return (
            <div className="flex gap-1 py-1 items-center justify-center">
              <div
                onClick={() => {
                  if (params && params.data) {
                    setSelectedUserId(params.data.id);
                    setOpenModalUser(true);
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
                    setSelectedUserId(params.data.id);
                    setOpenModalUser(true);
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
                          <p>Apakah anda yakin ingin menghapus user ini?</p>
                        </div>
                      ),
                      onConfirm: () => {
                        if (params && params.data) mutateDeleteUser(params.data.id);
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
  }, [usersData, mode]);

  const globalLoading = useMemo(() => {
    return isLoadingUsers || isLoadingCreateUser || isLoadingUpdateUser || isLoadingDeleteUser;
  }, [isLoadingUsers, isLoadingCreateUser, isLoadingUpdateUser, isLoadingDeleteUser]);

  useEffect(() => {
    if (usersDataById && (mode === 'view' || mode === 'edit')) {
      reset(usersDataById);
    } else if (mode === 'create') {
      reset({
        email: '',
        username: '',
        name: '',
        phone: '',
        password: '',
      });
    }
  }, [usersDataById, mode, reset]);

  return {
    globalLoading,
    isLoadingCreateUser,
    isLoadingUpdateUser,
    mutateDeleteUser,
    onSubmit,
    onInvalid,
    control,
    handleSubmit,
    watch,
    errors,
    reset,
    setSelectedUserId,
    setOpenModalUser,
    openModalUser,
    isLoadingUsers,
    usersData,
    usersColumnsDef,
    activities,
    activeTab,
    setActiveTab,
    usersDataById,
    isLoadingUsersById,
    mode,
    setMode,
    setPage,
    page,
    limit,
    setSearch,
    search,
    isLoadingDeleteUser,
    setFilter,
    filter,
  };
};

const UserManagementContext = createContext<ReturnType<typeof useUserManagementHooks> | undefined>(
  undefined,
);

export const UserManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useUserManagementHooks();
  return <UserManagementContext.Provider value={value}>{children}</UserManagementContext.Provider>;
};

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('UserManagementContext must be used within an UserManagementProvider');
  }
  return context;
};
export default useUserManagement;
