import { Box, Button, Checkbox, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseSharp';
import usePartnerManagement from '../hooks';
import CInput from '@/components/atoms/input';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';
import CInputFile from '@/components/atoms/input-file';
import { Controller } from 'react-hook-form';
import FormSkeleton from './formSkeleton';
import { BlockingLoader } from '@/components/atoms/loader';
import { useMemo } from 'react';

const ModalPartner = () => {
  const {
    openModalPartner,
    setOpenModalPartner,
    handleSubmit,
    onSubmit,
    onInvalid,
    setSelectedPartnerId,
    control,
    mode,
    errors,
    isLoadingCreatePartner,
    isLoadingUpdatePartner,
    isLoadingDataPartnerById,
  } = usePartnerManagement();

  const handleClose = () => {
    setOpenModalPartner(false);
    setSelectedPartnerId('');
  };

  const title = useMemo(() => {
    if (mode === 'create') return 'Add New Partner';
    if (mode === 'edit') return 'Edit Partner';
    if (mode === 'view') return 'View Partner';
  }, [mode]);

  return (
    <div>
      {(isLoadingCreatePartner || isLoadingUpdatePartner) && <BlockingLoader />}
      <Modal
        open={openModalPartner}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="w-full flex justify-center items-center px-72"
      >
        <Box className=" w-full bg-white rounded-md text-black">
          <div className="w-full flex justify-between items-center p-5">
            <p className="font-semibold text-xl ">{title}</p>
            <div className=" justify-end py-2 gap-2">
              <CloseIcon
                onClick={() => setOpenModalPartner(!openModalPartner)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full bg-gray-100 p-5 border-b border-t border-gray-200">
            <p className="text-sm">
              Complete all require fields to add a new partner. We may reach out to request
              additional information.
              <span className="text-[#f46e31] cursor-pointer">
                Learn more about our partner policy
              </span>
            </p>
          </div>

          {isLoadingDataPartnerById && mode !== 'create' ? (
            <FormSkeleton />
          ) : (
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <div className="overflow-y-scroll max-h-[70vh] no-srollbar p-8 flex flex-col w-ful gap-10">
                {/* basic information */}
                <div className="flex flex-col w-full gap-3">
                  <p className="text-md font-semibold">Basic Information</p>
                  <div className="flex flex-col w-full gap-4">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <CInput
                          {...field}
                          label="Partner Name*"
                          className="w-full"
                          type="text"
                          placeholder="Enter partner name"
                          disabled={mode === 'view'}
                          error={!!errors.name}
                        />
                      )}
                    />

                    <div className="flex w-full justify-center items-center gap-4">
                      <Controller
                        name="type"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                          const options = [{ label: 'Supplier', value: 'supplier' }];
                          return (
                            <CAutoComplete
                              label="Partner Type*"
                              options={options}
                              className="w-full"
                              value={options.find(opt => opt.value === value) ?? null}
                              onChange={(_, newValue) => onChange(newValue?.value ?? null)}
                              getOptionLabel={option => option?.label ?? ''}
                              isOptionEqualToValue={(option, val) => option.value === val?.value}
                              placeholder="Select partner type"
                              error={!!errors.type}
                              disabled={mode === 'view'}
                            />
                          );
                        }}
                      />
                      {/* <CAutoComplete
                      className="w-full"
                      label="Partner Type*"
                      options={[]}
                      placeholder="Select partner type"
                    /> */}
                      <Controller
                        name="npwp"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="NPWP*"
                            className="w-full"
                            disabled={mode === 'view'}
                            type="text"
                            placeholder="00.000.000.0-000.000"
                            error={!!errors.npwp}
                            onChange={e => {
                              const rawValue = e.target.value.replace(/\D/g, '');
                              let formattedValue = rawValue;
                              if (rawValue.length > 2)
                                formattedValue = rawValue.replace(/^(\d{2})(\d+)/, '$1.$2');
                              if (rawValue.length > 5)
                                formattedValue = formattedValue.replace(
                                  /^(\d{2})\.(\d{3})(\d+)/,
                                  '$1.$2.$3',
                                );
                              if (rawValue.length > 8)
                                formattedValue = formattedValue.replace(
                                  /^(\d{2})\.(\d{3})\.(\d{3})(\d+)/,
                                  '$1.$2.$3.$4',
                                );
                              if (rawValue.length > 9)
                                formattedValue = formattedValue.replace(
                                  /^(\d{2})\.(\d{3})\.(\d{3})\.(\d{1})(\d+)/,
                                  '$1.$2.$3.$4-$5',
                                );
                              if (rawValue.length > 12)
                                formattedValue = formattedValue.replace(
                                  /^(\d{2})\.(\d{3})\.(\d{3})\.(\d{1})-(\d{3})(\d+)/,
                                  '$1.$2.$3.$4-$5.$6',
                                );
                              field.onChange(formattedValue);
                            }}
                            value={field.value || ''}
                            inputProps={{ maxLength: 20 }}
                          />
                        )}
                      />
                    </div>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          label="Alamat*"
                          disabled={mode === 'view'}
                          placeholder="Jl. Contoh No. Contoh"
                          className="w-full"
                          type="text"
                          error={!!errors.address}
                        />
                      )}
                    />
                    <div className="flex w-full justify-center items-center gap-4">
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Kota*"
                            disabled={mode === 'view'}
                            className="w-full"
                            type="text"
                            placeholder="Jakarta"
                            error={!!errors.city}
                          />
                        )}
                      />
                      <Controller
                        name="province"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Provinsi*"
                            disabled={mode === 'view'}
                            className="w-full"
                            type="text"
                            placeholder="DKI Jakarta"
                            error={!!errors.province}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact information */}
                <div className="flex flex-col w-full gap-3">
                  <p className="text-md font-semibold">Contact Information</p>
                  <div className="flex flex-col w-full gap-4">
                    <div className="w-full flex justify-center items-center gap-4">
                      <Controller
                        name="contact_name"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Contact Person Name*"
                            disabled={mode === 'view'}
                            className="w-full"
                            type="text"
                            placeholder="Full name"
                            error={!!errors.contact_name}
                          />
                        )}
                      />
                      <Controller
                        name="position"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Position*"
                            disabled={mode === 'view'}
                            className="w-full"
                            type="text"
                            placeholder="CEO/Director"
                            error={!!errors.position}
                          />
                        )}
                      />
                    </div>
                    <div className="w-full flex justify-center items-center gap-4">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Email*"
                            className="w-full"
                            disabled={mode === 'view'}
                            type="email"
                            placeholder="admin@example.com"
                            error={!!errors.email}
                          />
                        )}
                      />
                      <Controller
                        name="phone_number"
                        control={control}
                        render={({ field }) => (
                          <CInput
                            {...field}
                            label="Phone Number*"
                            className="w-full"
                            disabled={mode === 'view'}
                            type="text"
                            placeholder="021-876543212"
                            error={!!errors.phone_number}
                            onChange={e => {
                              const numericValue = e.target.value.replace(/\D/g, '');
                              field.onChange(numericValue);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Legal Information */}
                <div className="flex flex-col w-full gap-3">
                  <p className="text-md font-semibold">Legal Documents</p>
                  <div className="flex flex-col w-full gap-4">
                    <CInputFile
                      label="Company Profile*"
                      id="company-profile"
                      maxSize={1024 * 1024 * 5}
                    />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-1 w-full">
                      <Checkbox />
                      <small>Business License (SIUP)</small>
                    </div>
                    <div className="flex items-center gap-1 w-full">
                      <Checkbox />
                      <small>Company Registration (TDP)</small>
                    </div>
                    <div className="flex items-center gap-1 w-full">
                      <Checkbox />
                      <small>Business Identification Number (NIB)</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-5 bg-gray-100 p-5 border-t border-gray-200">
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  className="!shadow-sm !bg-gray-100 !border-gray-300 !text-black !capitalize"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Validate & Save
                </Button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};
export default ModalPartner;
