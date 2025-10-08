import { Box, Button, IconButton, Modal } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close';
import useUserManagement from '../hooks';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import EmailIconSVG from '@/assets/svg/email.svg';
import Image from 'next/image';

export default function ModalActivate() {
  const {
    openModalActivateEmail,
    setOpenModalAtivateEmail,
    controlActivate,
    handleSubmitActivate,
    errorsActivate,
    onSubmitActivate,
    onInvalidActivate,
    isLoadingSendOtp,
  } = useUserManagement();
  const handleClose = () => {
    setOpenModalAtivateEmail(false);
  };

  return (
    <>
      <Modal
        open={openModalActivateEmail}
        onClose={handleClose}
        aria-labelledby="modal-user-profile"
        className="flex justify-center items-center px-4 md:px-40"
      >
        <Box className="w-full max-w-lg bg-white rounded-lg shadow-xl">
          <div className="flex justify-end items-center px-6 pt-4">
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center w-full">
            Aktivasi Akun Anda
          </h2>
          <p className="text-sm text-gray-500 text-center">Masukkan Email Anda</p>

          <div className="max-h-[80vh] p-6">
            <div className="w-full flex justify-center items-center">
              <Image src={EmailIconSVG} alt="no-data" />
            </div>

            <form
              onSubmit={handleSubmitActivate(onSubmitActivate, onInvalidActivate)}
              className="text-black flex flex-col gap-8"
            >
              <Controller
                name="email"
                control={controlActivate}
                render={({ field }) => (
                  <CInput
                    {...field}
                    id="email"
                    label="Email Perusahaan*"
                    placeholder="nama@posindonesia.co.id"
                    required
                    autoComplete="off"
                    error={!!errorsActivate.email}
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

              <Button
                className="mt-4"
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                loading={isLoadingSendOtp}
              >
                <div className="flex justify-center items-center gap-2">
                  <LockOutlineIcon />
                  <span>Aktivasi</span>
                </div>
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
