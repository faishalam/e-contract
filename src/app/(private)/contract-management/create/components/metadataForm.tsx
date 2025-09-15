import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import TemplateSelector from './templateSelector';
import { TextArea } from '@/components/atoms/Input-text-area';

export default function MetadataForm() {
  return (
    <div className="w-full flex flex-col gap-6 px-6 py-4 bg-[#f9fafb]">
      <div className="text-black flex flex-col">
        <p className="text-2xl font-bold">Detail Metadata Kontak</p>
        <p className="text-sm text-gray-700">
          Isi informari dasar untuk kontrak baru. Metadata ini akan digunakan untuk identifikasi dan
          pencarian kontrak.
        </p>
      </div>
      <div className="w-full flex justify-center items-center text-black gap-6 bg-white p-6 rounded-md shadow">
        <div className="w-full flex flex-col gap-4">
          <CInput
            label="Judul Kontrak*"
            className="w-full"
            type="text"
            placeholder="Masukkan judul kontrak"
            // onChange={e => setSearch(e.target.value)}
            // value={search}
          />
          <CAutoComplete
            label="Pihak 1 (Pos Indonesia)*"
            options={[]}
            className="w-full"
            getOptionKey={option => option.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // onChange={(_, status) => {
            // setFilter({ ...filter, status });
            // }}
            getOptionLabel={option => option.label}
            placeholder="Pihak pertama*"
          />
          <CAutoComplete
            label="Pihak 2 (Nama Mitra/Vendor)*"
            options={[]}
            className="w-full"
            getOptionKey={option => option.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // onChange={(_, status) => {
            // setFilter({ ...filter, status });
            // }}
            getOptionLabel={option => option.label}
            placeholder="Pihak kedua*"
          />
          <CAutoComplete
            label="Tipe Kontrak*"
            options={[]}
            className="w-full"
            getOptionKey={option => option.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // onChange={(_, status) => {
            // setFilter({ ...filter, status });
            // }}
            getOptionLabel={option => option.label}
            placeholder="Tipe kontrak*"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <CInput label="Nilai Kontrak*" className="w-full" type="text" icon={'Rp'} />
          <div className="w-full flex justify-center items-center gap-2">
            <CInput
              type="date"
              className="w-full"
              label="Tanggal Mulai*"
              // onChange={e => setFilter({ ...filter, cutoff_from: e.target.value })}
              // value={filter.cutoff_from}
            />

            <CInput
              type="date"
              className="w-full"
              label="Tanggal Selesai*"
              // onChange={e => setFilter({ ...filter, cutoff_from: e.target.value })}
              // value={filter.cutoff_from}
            />
          </div>
          <CAutoComplete
            label="PIC Internal*"
            options={[]}
            className="w-full"
            getOptionKey={option => option.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // onChange={(_, status) => {
            // setFilter({ ...filter, status });
            // }}
            getOptionLabel={option => option.label}
            placeholder="PIC Internal*"
          />

          <CAutoComplete
            label="Department*"
            options={[]}
            className="w-full"
            getOptionKey={option => option.value}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            // onChange={(_, status) => {
            // setFilter({ ...filter, status });
            // }}
            getOptionLabel={option => option.label}
            placeholder="Pihak pertama*"
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
          <TextArea
            label="Deskripsi Kontrak"
            placeholder="Masukkan deskripsi kontrak"
            value={''}
            className="w-full"
            onChange={e =>
              // setFilter({ ...filter, cutoff_from: e.target.value })
              console.log(e.target.value)
            }
          />
          <CInput
            label="Tag*"
            className="w-full"
            type="text"
            placeholder="Pisahkan tag dengan koma"
            // onChange={e => setSearch(e.target.value)}
            // value={search}
          />
        </div>
      </div>
    </div>
  );
}
