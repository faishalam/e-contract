import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import TemplateSelector from './metadataForm/templateSelector';
import { TextArea } from '@/components/atoms/Input-text-area';
import { TOption } from '../types';
import { Controller } from 'react-hook-form';
import useCreateContract from '../hooks';
// data dummy
const mockParty1Options: TOption[] = [
  { value: 'pos-pusat', label: 'PT. POS Indonesia (Pusat)' },
  { value: 'pos-regional-1', label: 'PT. POS Indonesia Regional I' },
  { value: 'pos-regional-2', label: 'PT. POS Indonesia Regional II' },
];

const mockParty2Options: TOption[] = [
  { value: 'vendor-1', label: 'PT. Vendor Technology' },
  { value: 'vendor-2', label: 'CV. Partner Logistics' },
  { value: 'vendor-3', label: 'PT. Digital Solutions' },
];

const mockContractTypes: TOption[] = [
  { value: 'service', label: 'Kontrak Jasa' },
  { value: 'procurement', label: 'Kontrak Pengadaan' },
  { value: 'partnership', label: 'Kontrak Kemitraan' },
  { value: 'maintenance', label: 'Kontrak Pemeliharaan' },
];

const mockPICOptions: TOption[] = [
  { value: 'pic-1', label: 'Ahmad Rizki (Manager IT)' },
  { value: 'pic-2', label: 'Sari Indah (Manager Procurement)' },
  { value: 'pic-3', label: 'Budi Santoso (Manager Operations)' },
];

const mockDepartments: TOption[] = [
  { value: 'it', label: 'Information Technology' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'operations', label: 'Operations' },
  { value: 'finance', label: 'Finance' },
  { value: 'legal', label: 'Legal' },
];

export default function MetadataForm() {
  const { control } = useCreateContract();

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="max-w-full w-full flex flex-col items-center">
      <div className="lg:max-w-6xl md:max-w-lg max-w-full w-full flex justify-center">
        <div className="w-full flex flex-col gap-6 py-4">
          <div className="text-black flex flex-col">
            <p className="text-2xl font-bold">Detail Metadata Kontak</p>
            <p className="text-sm text-gray-700">
              Isi informari dasar untuk kontrak baru. Metadata ini akan digunakan untuk identifikasi
              dan pencarian kontrak.
            </p>
          </div>
          <div className="w-full md:flex lg:flex-row flex-col justify-center items-center text-black gap-6 bg-white p-6 rounded-md shadow">
            <div className="w-full flex flex-col gap-4">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Judul Kontrak*"
                    className="w-full"
                    type="text"
                    placeholder="Masukkan judul kontrak"
                  />
                )}
              />
              <Controller
                name="party1"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Pihak 1 (Pos Indonesia)*"
                    options={mockParty1Options}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionKey={option => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    getOptionLabel={option => option.label}
                    placeholder="Pilih pihak pertama*"
                  />
                )}
              />
              <Controller
                name="party2"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Pihak 2 (Nama Mitra/Vendor)*"
                    options={mockParty2Options}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionKey={option => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    getOptionLabel={option => option.label}
                    placeholder="Pilih pihak kedua*"
                  />
                )}
              />
              <Controller
                name="contractType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Tipe Kontrak*"
                    options={mockContractTypes}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionKey={option => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    getOptionLabel={option => option.label}
                    placeholder="Pilih tipe kontrak*"
                  />
                )}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <Controller
                name="contractValue"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CInput
                    label="Nilai Kontrak*"
                    className="w-full"
                    type="text"
                    icon="Rp"
                    value={value}
                    onChange={e => {
                      const formatted = formatCurrency(e.target.value);
                      onChange(formatted);
                    }}
                    placeholder="0"
                  />
                )}
              />
              <div className="w-full flex justify-center items-center gap-2">
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <CInput {...field} type="date" className="w-full" label="Tanggal Mulai*" />
                  )}
                />
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field }) => (
                    <CInput {...field} type="date" className="w-full" label="Tanggal Selesai*" />
                  )}
                />
              </div>
              <Controller
                name="picInternal"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="PIC Internal*"
                    options={mockPICOptions}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionKey={option => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    getOptionLabel={option => option.label}
                    placeholder="Pilih PIC Internal*"
                  />
                )}
              />
              <Controller
                name="department"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CAutoComplete
                    label="Department*"
                    options={mockDepartments}
                    className="w-full"
                    value={value}
                    onChange={(_, newValue) => onChange(newValue)}
                    getOptionKey={option => option.value}
                    renderOption={(props, option) => (
                      <li {...props} key={option.value}>
                        {option.label}
                      </li>
                    )}
                    getOptionLabel={option => option.label}
                    placeholder="Pilih department*"
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="text-black flex flex-col">
              <h2 className="font-semibold text-lg text-black">Template Kontrak</h2>
            </div>
            <TemplateSelector />
          </div>
          <div className="w-full bg-white rounded-md shadow p-4 text-black">
            <div className="text-black flex flex-col">
              <h2 className="font-semibold text-lg text-black">Informasi Tambahan (Opsional)</h2>
            </div>
            <div className="flex w-full flex-col gap-4">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    label="Deskripsi Kontrak"
                    placeholder="Masukkan deskripsi kontrak"
                    className="w-full"
                  />
                )}
              />
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <CInput
                    {...field}
                    label="Tag"
                    className="w-full"
                    type="text"
                    placeholder="Pisahkan tag dengan koma"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
