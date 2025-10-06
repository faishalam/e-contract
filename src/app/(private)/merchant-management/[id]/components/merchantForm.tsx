import CInput from '@/components/atoms/input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Controller } from 'react-hook-form';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInputFileCustom from '@/components/atoms/input-file-custom';
import ButtonNav from './buttonNav';
import { TextArea } from '@/components/atoms/Input-text-area';
import InfoIcon from '@mui/icons-material/Info';
import useCreateMerchantHooks from '../hooks';

export default function MerchantForm() {
  const { control, errors, handleSubmit, onSubmit, onInvalid } = useCreateMerchantHooks();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <CorporateFareIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Informasi Perusahaan</p>
          </div>
          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="company_name"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nama Perusahaan*"
                      className="w-full"
                      type="text"
                      placeholder="PT. Contoh Perusahaan"
                      error={!!errors.company_name}
                    />
                  )}
                />
                <Controller
                  name="npwp"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="NPWP*"
                      className="w-full"
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

                <Controller
                  name="industry"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CAutoComplete
                      label="Industri*"
                      options={[{ value: 'Technology', label: 'Technology' }]}
                      className="w-full"
                      value={
                        [{ value: 'Technology', label: 'Technology' }].find(
                          opt => opt.value === value,
                        ) || null
                      }
                      onChange={(_, newValue) => onChange(newValue?.value || '')}
                      getOptionKey={option => option.value}
                      getOptionLabel={option => option.label}
                      isOptionEqualToValue={(option, val) => option.value === val?.value}
                      placeholder="Pilih Industri*"
                      error={!!errors.industry}
                    />
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="brand_name"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nama Brand/Display*"
                      className="w-full"
                      type="text"
                      placeholder="Contoh Corp"
                      error={!!errors.brand_name}
                    />
                  )}
                />
                <Controller
                  name="nib"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="NIB (Nomor Induk Berusaha)*"
                      className="w-full"
                      type="text"
                      placeholder="0000000000000"
                      error={!!errors.nib}
                      onChange={e => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        const limitedValue = numericValue.slice(0, 13);
                        field.onChange(limitedValue);
                      }}
                      value={field.value || ''}
                      inputProps={{ maxLength: 13 }}
                    />
                  )}
                />

                <Controller
                  name="company_size"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CAutoComplete
                      label="Ukuran Perusahaan*"
                      options={[
                        { label: 'Kecil', value: 'Small' },
                        { label: 'Sedang', value: 'Medium' },
                        { label: 'Besar', value: 'Large' },
                      ]}
                      className="w-full"
                      value={
                        [
                          { label: 'Kecil', value: 'Small' },
                          { label: 'Sedang', value: 'Medium' },
                          { label: 'Besar', value: 'Large' },
                        ].find(opt => opt.value === value) || null
                      }
                      onChange={(_, newValue) => onChange(newValue?.value || '')}
                      getOptionKey={option => option.value}
                      getOptionLabel={option => option.label}
                      isOptionEqualToValue={(option, val) => option.value === val?.value}
                      placeholder="Pilih Industri*"
                      error={!!errors.industry}
                    />
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <Controller
                name="profile.address"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    label="Alamat Perusahaan*"
                    placeholder="Jl. Contoh No. Contoh"
                    className="w-full"
                    type="text"
                    error={!!errors.profile?.address}
                  />
                )}
              />

              <div className="w-full flex gap-6 items-center">
                <Controller
                  name="profile.city"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Kota*"
                      className="w-full"
                      type="text"
                      placeholder="Jakarta"
                      error={!!errors.profile?.city}
                    />
                  )}
                />
                <Controller
                  name="profile.province"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Provinsi*"
                      className="w-full"
                      type="text"
                      placeholder="DKI Jakarta"
                      error={!!errors.profile?.province}
                    />
                  )}
                />
                <Controller
                  name="profile.postal_code"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      type="text"
                      label="Kode Pos*"
                      className="w-full"
                      placeholder="12345"
                      onChange={e => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        field.onChange(numericValue);
                      }}
                      error={!!errors.profile?.postal_code}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <ContactsIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Informasi Kontak</p>
          </div>
          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="profile.company_email"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Email Perusahaan*"
                      className="w-full"
                      type="text"
                      placeholder="admin@contohperusahaan.com"
                      error={!!errors.profile?.company_email}
                    />
                  )}
                />
                <Controller
                  name="profile.website"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Website*"
                      className="w-full"
                      type="text"
                      placeholder="https://contohperusahaan.com"
                      error={!!errors.profile?.website}
                    />
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="profile.company_phone"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nomor Telepon*"
                      className="w-full"
                      type="text"
                      placeholder="021-876543212"
                      error={!!errors.profile?.company_phone}
                    />
                  )}
                />
                <Controller
                  name="profile.fax"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nomor Fax*"
                      className="w-full"
                      type="text"
                      placeholder="021-876543212"
                      onChange={e => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        field.onChange(numericValue);
                      }}
                      error={!!errors.profile?.fax}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <PersonIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Person in Charge (PIC)</p>
          </div>
          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="pic.name"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nama Lengkap*"
                      className="w-full"
                      type="text"
                      placeholder="Budi Santoso"
                      error={!!errors.pic?.name}
                    />
                  )}
                />
                <Controller
                  name="pic.email"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Email*"
                      className="w-full"
                      type="text"
                      placeholder="admin@contohperusahaan.com"
                      error={!!errors.pic?.email}
                    />
                  )}
                />
                <Controller
                  name="pic.department"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Department*"
                      className="w-full"
                      type="text"
                      placeholder="Management"
                      error={!!errors.pic?.department}
                    />
                  )}
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <Controller
                  name="pic.position"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Jabatan*"
                      className="w-full"
                      type="text"
                      placeholder="CEO / Direktur"
                      error={!!errors.pic?.position}
                    />
                  )}
                />
                <Controller
                  name="pic.phone"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Nomor HP*"
                      className="w-full"
                      type="text"
                      placeholder="0812-34567890"
                      error={!!errors.pic?.phone}
                    />
                  )}
                />
                <Controller
                  name="pic.office_phone"
                  control={control}
                  render={({ field }) => (
                    <CInput
                      {...field}
                      label="Telepon Kantor*"
                      className="w-full"
                      type="text"
                      placeholder="021-876543212"
                      onChange={e => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        field.onChange(numericValue);
                      }}
                      error={!!errors.pic?.office_phone}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <InfoIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Informasi Lainnya</p>
          </div>

          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
              <Controller
                name="profile.plan"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Plan*"
                    options={[
                      { value: 'basic', label: 'Basic' },
                      { value: 'premium', label: 'Premium' },
                      { value: 'enterprise', label: 'Enterprise' },
                    ]}
                    className="w-full"
                    value={
                      [
                        { value: 'basic', label: 'Basic' },
                        { value: 'premium', label: 'Premium' },
                        { value: 'enterprise', label: 'Enterprise' },
                      ].find(opt => opt.value === value) || null
                    }
                    onChange={(_, newValue) => onChange(newValue?.value || '')}
                    getOptionKey={option => option.value}
                    getOptionLabel={option => option.label}
                    isOptionEqualToValue={(option, val) => option.value === val?.value}
                    placeholder="Pilih Industri*"
                    error={!!errors.industry}
                  />
                )}
              />
              <Controller
                name="profile.joined_date"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Join Date*"
                    className="w-full"
                    type="date"
                    error={!!errors.profile?.joined_date}
                  />
                )}
              />
              <Controller
                name="profile.renewal_date"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Renewal Date*"
                    className="w-full"
                    type="date"
                    error={!!errors.profile?.renewal_date}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <SummarizeIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Dokumen Pendukung</p>
          </div>
          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
              <div className="w-full flex flex-col gap-4">
                <CInputFileCustom
                  label="Akta Pendirian Perusahaan"
                  type="file"
                  className="h-[180px]"
                  title="Upload File"
                  description="Unggah dokumen kontrak dari komputer Anda"
                  subDescription="Format didukung: PDF, DOC, DOCX • Maksimal 50MB"
                  icon={<CloudUploadIcon sx={{ fontSize: 48, color: '#2563eb' }} />}
                  accept=".pdf,.doc,.docx"
                  onChangeFile={file => console.log('Selected file:', file)}
                  active
                />
                <CInputFileCustom
                  label="NIB Pendirian Perusahaan"
                  type="file"
                  title="Upload File"
                  className="h-[180px]"
                  description="Unggah dokumen kontrak dari komputer Anda"
                  subDescription="Format didukung: PDF, DOC, DOCX • Maksimal 50MB"
                  icon={<CloudUploadIcon sx={{ fontSize: 48, color: '#2563eb' }} />}
                  accept=".pdf,.doc,.docx"
                  onChangeFile={file => console.log('Selected file:', file)}
                  active
                />
              </div>

              <div className="w-full flex flex-col gap-4">
                <CInputFileCustom
                  type="file"
                  title="Upload File"
                  className="h-[180px]"
                  label="NPWP Perusahaan"
                  description="Unggah dokumen kontrak dari komputer Anda"
                  subDescription="Format didukung: PDF, DOC, DOCX • Maksimal 50MB"
                  icon={<CloudUploadIcon sx={{ fontSize: 48, color: '#2563eb' }} />}
                  accept=".pdf,.doc,.docx"
                  onChangeFile={file => console.log('Selected file:', file)}
                  active
                />
                <CInputFileCustom
                  type="file"
                  title="Upload File"
                  className="h-[180px]"
                  label="KTP PIC Utama"
                  description="Unggah dokumen kontrak dari komputer Anda"
                  subDescription="Format didukung: PDF, DOC, DOCX • Maksimal 50MB"
                  icon={<CloudUploadIcon sx={{ fontSize: 48, color: '#2563eb' }} />}
                  accept=".pdf,.doc,.docx"
                  onChangeFile={file => console.log('Selected file:', file)}
                  active
                />
              </div>
            </div>
          </div>
        </div>
        <ButtonNav />
      </form>
    </>
  );
}
