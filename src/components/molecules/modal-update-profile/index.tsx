import React from 'react';
import { Box, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useAuth from '@/context/profileProvider/hooks';
import { Controller } from 'react-hook-form';
import CInput from '@/components/atoms/input';

const ModalUpdateProfile: React.FC = () => {
  const {
    dataProfile,
    openModalUpdateProfile,
    setOpenModalUpdateProfile,
    handleSubmitUpdateProfile,
    onSubmitUpdateProfile,
    onInvalidUpdateProfile,
    controlUpdateProfile,
    errorsUpdateProfile,
    isLoadingUpdateProfile,
  } = useAuth();

  const handleClose = () => {
    setOpenModalUpdateProfile(false);
  };

  return (
    <Modal
      open={openModalUpdateProfile}
      onClose={handleClose}
      aria-labelledby="modal-user-profile"
      className="flex justify-center items-center px-4 md:px-40"
    >
      <Box className="w-full max-w-xl bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="overflow-y-auto max-h-[80vh] p-6">
          <p className="text-sm text-gray-500">
            <AccountCircleOutlinedIcon className="mr-2" />
            {dataProfile?.email}
          </p>

          <form onSubmit={handleSubmitUpdateProfile(onSubmitUpdateProfile, onInvalidUpdateProfile)}>
            <div className="flex w-full flex-col gap-3 text-black py-8">
              <Controller
                name="name"
                control={controlUpdateProfile}
                render={({ field }) => (
                  <CInput
                    label="Nama*"
                    placeholder="John Doe"
                    {...field}
                    required
                    error={!!errorsUpdateProfile.name}
                  />
                )}
              />

              <Controller
                name="phone"
                control={controlUpdateProfile}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Nomor Telepon*"
                    className="w-full"
                    type="text"
                    placeholder="021-876543212"
                    error={!!errorsUpdateProfile.phone}
                    onChange={e => {
                      const numericValue = e.target.value.replace(/\D/g, '');
                      field.onChange(numericValue);
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
              loading={isLoadingUpdateProfile}
            >
              Simpan
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalUpdateProfile;
