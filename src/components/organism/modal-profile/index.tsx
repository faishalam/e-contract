import React from 'react';
import { Box, Modal, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '@/context/AuthProvider/hooks';

const ModalUserProfile: React.FC = () => {
  const { openModalProfile, setOpenModalProfile, dataProfile, setOpenModalChangePassword } =
    useAuth();

  const handleClose = () => {
    setOpenModalProfile(false);
  };

  const profileItems = [
    { label: 'Username', value: dataProfile?.username || '-' },
    { label: 'Name', value: dataProfile?.name || '-' },
    { label: 'Email', value: dataProfile?.email || '-' },
    { label: 'Nomor Telepon', value: dataProfile?.phone || '-' },
    { label: 'Role', value: dataProfile?.role || '-' },
  ];

  return (
    <Modal
      open={openModalProfile}
      onClose={handleClose}
      aria-labelledby="modal-user-profile"
      className="flex justify-center items-center px-4 md:px-40"
    >
      <Box className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Profil Pengguna</h2>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="overflow-y-auto max-h-[80vh] p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center mb-4">
              <AccountCircleOutlinedIcon sx={{ fontSize: 100, color: '#6B7280' }} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {dataProfile?.name || 'Nama Pengguna'}
            </h3>
            <p className="text-sm text-gray-500">{dataProfile?.role || 'role-user'}</p>
          </div>

          <div className="space-y-4 mb-6">
            {profileItems.map((item, index) => (
              <div key={index} className="flex items-start border-b border-gray-100 pb-3">
                <div className="w-48 flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-600">{item.label}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenModalChangePassword(true);
              }}
              variant="contained"
              color="secondary"
              startIcon={<EditIcon />}
            >
              Ganti Kata Sandi
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalUserProfile;
