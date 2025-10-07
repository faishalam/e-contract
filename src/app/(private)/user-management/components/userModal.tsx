import { Box, Button, IconButton, Modal } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useUserManagement from '../hooks';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';
import { useMemo, useState } from 'react';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import CIconButton from '@/components/atoms/icon-button';
import CAutoComplete from '@/components/atoms/auto-complete';
import UserFormSkeleton from './formSkeleton';

export default function UserModal() {
  const {
    openModalUser,
    setOpenModalUser,
    setSelectedUserId,
    isLoadingUsersById,
    control,
    handleSubmit,
    onSubmit,
    onInvalid,
    mode,
    errors,
    isLoadingCreateUser,
    isLoadingUpdateUser,
  } = useUserManagement();
  const handleClose = () => {
    setOpenModalUser(false);
    setSelectedUserId('');
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const title = useMemo(() => {
    if (mode === 'create') return 'Create New User';
    if (mode === 'edit') return 'Edit Profile User';
    if (mode === 'view') return 'View Profile User';
  }, [mode]);

  return (
    <>
      <Modal
        open={openModalUser}
        onClose={handleClose}
        aria-labelledby="modal-user-profile"
        className="flex justify-center items-center px-4 md:px-40"
      >
        <Box className="w-full max-w-2xl bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <div className="overflow-y-auto max-h-[80vh] p-6">
            {isLoadingUsersById && mode !== 'create' ? (
              <UserFormSkeleton />
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center mb-4">
                    <AccountCircleOutlinedIcon sx={{ fontSize: 100, color: '#6B7280' }} />
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                  <div className="space-y-2 mb-12 text-black">
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <CInput
                          {...field}
                          label="Email*"
                          className="w-full"
                          type="email"
                          placeholder="Masukkan email pengguna"
                          disabled={mode === 'view'}
                          error={!!errors.email}
                          slotProps={{
                            input: {
                              startAdornment: <EmailIcon className="text-gray-400" />,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <CInput
                          {...field}
                          label="Username*"
                          className="w-full"
                          type="text"
                          placeholder="Masukkan username pengguna"
                          disabled={mode === 'view'}
                          error={!!errors.username}
                          slotProps={{
                            input: {
                              startAdornment: <PermIdentityIcon className="text-gray-400" />,
                            },
                          }}
                        />
                      )}
                    />
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CInput
                          {...field}
                          label="Nama*"
                          className="w-full"
                          type="text"
                          placeholder="Masukkan nama pengguna"
                          disabled={mode === 'view'}
                          error={!!errors.name}
                          slotProps={{
                            input: {
                              startAdornment: <PermIdentityIcon className="text-gray-400" />,
                            },
                          }}
                        />
                      )}
                    />
                    {mode === 'create' && (
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            label="Password*"
                            placeholder="Enter password"
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            required
                            error={!!errors.password}
                            slotProps={{
                              input: {
                                endAdornment: (
                                  <CIconButton size="small" edge="end" onClick={toggleShowPassword}>
                                    {showPassword ? (
                                      <VisibilityOff className="text-gray-400" />
                                    ) : (
                                      <Visibility className="text-gray-400" />
                                    )}
                                  </CIconButton>
                                ),
                                startAdornment: (
                                  <LockOutlineIcon
                                    className="text-gray-400"
                                    style={{ fontSize: '1.3rem' }}
                                  />
                                ),
                              },
                            }}
                          />
                        )}
                      />
                    )}
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <CInput
                          {...field}
                          label="Nomor Telepon*"
                          className="w-full"
                          type="text"
                          placeholder="Masukkan nomor telepon pengguna"
                          disabled={mode === 'view'}
                          error={!!errors.phone}
                          slotProps={{
                            input: {
                              startAdornment: <LocalPhoneIcon className="text-gray-400" />,
                            },
                          }}
                        />
                      )}
                    />
                    {mode === 'edit' && (
                      <Controller
                        name="is_active"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          const options = [
                            { label: 'Aktif', value: true },
                            { label: 'Tidak Aktif', value: false },
                          ];

                          return (
                            <CAutoComplete
                              label="Status*"
                              options={options}
                              className="w-full"
                              value={options.find(opt => opt.value === value) ?? null}
                              onChange={(_, newValue) => onChange(newValue?.value ?? null)}
                              getOptionLabel={option => option?.label ?? ''}
                              isOptionEqualToValue={(option, val) => option.value === val?.value}
                              slotProps={{
                                input: {
                                  startAdornment: <PermIdentityIcon className="text-gray-400" />,
                                },
                              }}
                            />
                          );
                        }}
                      />
                    )}

                    <CInput
                      label="Role*"
                      className="w-full"
                      type="text"
                      disabled
                      value={'Admin'}
                      slotProps={{
                        input: {
                          startAdornment: <PermIdentityIcon className="text-gray-400" />,
                        },
                      }}
                    />
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="flex justify-end gap-3 items-center max-w-full w-full">
                      <Button
                        variant="contained"
                        className="w-1/4 !rounded-md !shadow !bg-white !text-gray-500 hover:!bg-gray-100 !border !border-gray-300"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>

                      {mode !== 'view' && (
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="w-1/4 mt-4 !rounded-md"
                          loading={isLoadingCreateUser || isLoadingUpdateUser}
                        >
                          {mode === 'create' ? 'Buat Akun' : 'Update Akun'}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
