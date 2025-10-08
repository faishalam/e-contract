import { Box, Button, IconButton, Modal } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import useLogin from '../../login/hooks';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';
import CIconButton from '@/components/atoms/icon-button';
import { useState } from 'react';

export default function ModalCreatePassword() {
  const {
    openModalCreateNewPassword,
    setOpenModalCreateNewPassword,
    handleSubmitCreatePassword,
    onSubmitCreatePassword,
    onInvalidCreatePassword,
    controlCreatePassword,
    errorsCreatePassword,
    isLoadingCreatePassword,
  } = useLogin();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleClose = () => {
    setOpenModalCreateNewPassword(false);
  };
  return (
    <>
      <Modal
        open={openModalCreateNewPassword}
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
              Silakan buat kata sandi baru untuk mengakses akun Anda
            </p>

            <form
              onSubmit={handleSubmitCreatePassword(onSubmitCreatePassword, onInvalidCreatePassword)}
            >
              <div className="flex w-full flex-col gap-3 text-black py-8">
                <Controller
                  name="email"
                  control={controlCreatePassword}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      id="email"
                      label="Email Perusahaan*"
                      placeholder="nama@posindonesia.co.id"
                      required
                      autoComplete="off"
                      error={!!errorsCreatePassword.email}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <EmailIcon className="text-gray-400" style={{ fontSize: '1.3rem' }} />
                          ),
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={controlCreatePassword}
                  render={({ field }) => (
                    <CInput
                      label="Password*"
                      placeholder="Enter password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      required
                      error={!!errorsCreatePassword.password}
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
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="secondary"
                loading={isLoadingCreatePassword}
              >
                Simpan Kata Sandi
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
      ;
    </>
  );
}
