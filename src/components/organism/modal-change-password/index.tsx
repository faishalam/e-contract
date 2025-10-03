import React, { useState } from 'react';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '@/context/profileProvider/hooks';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';
import CIconButton from '@/components/atoms/icon-button';

const ModalChangePassword: React.FC = () => {
  const {
    openModalChangePassword,
    setOpenModalChangePassword,
    dataProfile,
    control,
    handleSubmit,
    errors,
    onSubmit,
    onInvalid,
    isLoadingChangePassword,
  } = useAuth();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShowPassword = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleClose = () => {
    setOpenModalChangePassword(false);
  };

  return (
    <Modal
      open={openModalChangePassword}
      onClose={handleClose}
      aria-labelledby="modal-user-profile"
      className="flex justify-center items-center px-4 md:px-40"
    >
      <Box className="w-full max-w-xl bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Ganti Kata Sandi</h2>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="overflow-y-auto max-h-[80vh] p-6">
          <p className="text-sm text-gray-500">
            Anda dengan nama akun {dataProfile?.name} yakin ingin mengganti kata sandi Anda? Proses
            ini tidak dapat dibatalkan.
          </p>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <div className="flex w-full flex-col gap-3 text-black py-8">
              <Controller
                name="current_password"
                control={control}
                render={({ field }) => (
                  <CInput
                    label="Kata Sandi Saat Ini*"
                    placeholder="Enter password"
                    type={showPassword.current ? 'text' : 'password'}
                    {...field}
                    required
                    error={!!errors.current_password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <CIconButton
                            size="small"
                            edge="end"
                            onClick={() => toggleShowPassword('current')}
                          >
                            {showPassword.current ? (
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

              <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                  <CInput
                    label="Kata Sandi Baru*"
                    placeholder="Enter kata sandi"
                    type={showPassword.new ? 'text' : 'password'}
                    {...field}
                    required
                    error={!!errors.new_password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <CIconButton
                            size="small"
                            edge="end"
                            onClick={() => toggleShowPassword('new')}
                          >
                            {showPassword.new ? (
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

              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <CInput
                    label="Konfirmasi Kata Sandi*"
                    placeholder="Enter kata sandi"
                    type={showPassword.confirm ? 'text' : 'password'}
                    {...field}
                    required
                    error={!!errors.confirm_password}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <CIconButton
                            size="small"
                            edge="end"
                            onClick={() => toggleShowPassword('confirm')}
                          >
                            {showPassword.confirm ? (
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
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              loading={isLoadingChangePassword}
            >
              Ganti Kata Sandi
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalChangePassword;
