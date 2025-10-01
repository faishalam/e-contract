import CInput from '@/components/atoms/input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { Controller } from 'react-hook-form';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';
import CInputFileCustom from '@/components/atoms/input-file-custom';
import useCreateMerchant from '../hooks';

export default function MerchantForm() {
  const { control, errors } = useCreateMerchant();
  return (
    <>
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
                name="npwm"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="NPWM"
                    className="w-full"
                    type="text"
                    placeholder="00.000.000.0-000.000"
                    error={!!errors.npwm}
                  />
                )}
              />
              <Controller
                name="industry"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Industri*"
                    options={[]}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
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
                    label="Nama Brand/Display"
                    className="w-full"
                    type="text"
                    placeholder="Contoh Corp"
                  />
                )}
              />
              <Controller
                name="nib"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="NIB (Nomor Induk Berusaha)"
                    className="w-full"
                    type="text"
                    placeholder="0000000000000000"
                  />
                )}
              />
              <Controller
                name="company_size"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Ukuran Perusahaan*"
                    options={[]}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
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
              name="company_address"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  label="Alamat Perusahaan*"
                  placeholder="Jl. Contoh No. Contoh"
                  className="w-full"
                  type="text"
                />
              )}
            />

            <div className="w-full flex gap-6 items-center">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Kota"
                    className="w-full"
                    type="text"
                    placeholder="Jakarta"
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Provinsi"
                    className="w-full"
                    type="text"
                    placeholder="DKI Jakarta"
                  />
                )}
              />
              <Controller
                name="postcode"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    type="number"
                    label="Kode Pos"
                    className="w-full"
                    placeholder="12345"
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
                name="company_email"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Email Perusahaan*"
                    className="w-full"
                    type="text"
                    placeholder="admin@contohperusahaan.com"
                  />
                )}
              />
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Website"
                    className="w-full"
                    type="text"
                    placeholder="https://contohperusahaan.com"
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Nomor Telepon*"
                    className="w-full"
                    type="text"
                    placeholder="Contoh Corp"
                    error={!!errors.phone_number}
                  />
                )}
              />
              <Controller
                name="fax"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Nomor Fax"
                    className="w-full"
                    type="text"
                    placeholder="021-876543212"
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
                name="pic_name"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Nama Lengkap*"
                    className="w-full"
                    type="text"
                    placeholder="Budi Santoso"
                    error={!!errors.pic_name}
                  />
                )}
              />
              <Controller
                name="pic_email"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Email*"
                    className="w-full"
                    type="text"
                    placeholder="admin@contohperusahaan.com"
                    error={!!errors.pic_email}
                  />
                )}
              />
              <Controller
                name="pic_department"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Department"
                    className="w-full"
                    type="text"
                    placeholder="Management"
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <Controller
                name="pic_jabatan"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Jabatan*"
                    className="w-full"
                    type="text"
                    placeholder="CEO / Direktur"
                    error={!!errors.pic_jabatan}
                  />
                )}
              />
              <Controller
                name="pic_phone_number"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Nomor HP*"
                    className="w-full"
                    type="text"
                    placeholder="admin@contohperusahaan.com"
                    error={!!errors.pic_phone_number}
                  />
                )}
              />
              <Controller
                name="pic_phone_number_office"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Telepon Kantor*"
                    className="w-full"
                    type="text"
                    placeholder="021-xxxxxx"
                  />
                )}
              />
            </div>
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
    </>
  );
}
