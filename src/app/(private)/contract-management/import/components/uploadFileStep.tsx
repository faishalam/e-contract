import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import { TextArea } from '@/components/atoms/Input-text-area';
import DoneIcon from '@mui/icons-material/Done';
import ImportCard from './importCard';
import { FaGoogleDrive, FaDropbox, FaMicrosoft } from 'react-icons/fa';

export default function UploadFile() {
  return (
    <>
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="max-w-6xl w-full flex flex-col gap-6 justify-center">
          <div className="w-full bg-[#f0fef4] p-4 border border-green-300 rounded-md">
            <div className="flex items-center gap-2">
              <div className="bg-[#22c55e] rounded-full w-4 h-4 flex justify-center items-center">
                <DoneIcon style={{ fontSize: '0.8rem' }} className="text-white" />
              </div>
              <p className="text-green-800 font-medium">File berhasil diunggah!</p>
            </div>
            <p className="text-green-700 text-sm ml-6">
              Silakan verifikasi informasi kontrak sebelum menyesuaikan proses import
            </p>
          </div>

          <div className="w-full flex flex-col bg-white p-4 rounded-md shadow">
            <div className="border-b -mx-4 pb-4 px-4">
              <p className="text-xl font-semibold text-black">Verifikasi Data Kontrak</p>
              <p className="text-sm text-gray-700">
                Pastikan informasi yang diesktrak dari document dari document sudah benar
              </p>
            </div>

            <div className="text-black flex flex-col p-2 gap-4">
              <div className="flex gap-4">
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <CInput
                    className="w-full"
                    type="text"
                    label="Judul Kontrak"
                    placeholder="Enter judul kontrak"
                  />
                  <CInput
                    className="w-full"
                    type="text"
                    label="Mitra/Vendor"
                    placeholder="Enter mitra/vendor"
                  />
                  <CInput className="w-full" type="date" label="Tanggal Mulai" />
                  <CInput
                    className="w-full"
                    type="text"
                    label="Nilai Kontrak (Rp)"
                    placeholder="Enter nilai kontrak"
                  />
                </div>
                <div className="flex flex-col gap-4 justify-center items-center w-full">
                  <CInput
                    className="w-full"
                    type="text"
                    label="Nama Kontrak"
                    placeholder="Enter nama kontrak"
                  />
                  <CAutoComplete
                    className="w-full"
                    label="Tipe Kontrak"
                    options={[]}
                    placeholder="Pilih Tipe Kontrak"
                  />
                  <CInput className="w-full" type="date" label="Tanggal Berakhir" />
                  <CAutoComplete
                    className="w-full"
                    options={[]}
                    label="Status"
                    placeholder="Pilih status kontrak"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 justify-center items-center w-full">
                <CAutoComplete
                  className="w-full"
                  options={[]}
                  label="PIC Internal"
                  placeholder="Pilih PIC internal"
                />
                <TextArea label="Deskripsi" placeholder="Enter deskripsi" className="w-full" />
              </div>
            </div>
          </div>

          <div className="lg:max-w-6xl md:max-w-lg max-w-sm w-full flex flex-col justify-center gap-6">
            <div className="w-full flex flex-col justify-start items-start">
              <p className="text-xl font-medium text-black">Sumber Import Lainnya</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              <ImportCard
                icon={<FaGoogleDrive className="text-blue-500" />}
                title="Google Drive"
                status="Terhubung"
                description="Import kontrak dari Google Drive Anda"
              />
              <ImportCard
                icon={<FaDropbox className="text-blue-400" />}
                title="Dropbox"
                status="Perlu koneksi"
                description="Import kontrak dari Dropbox"
              />
              <ImportCard
                icon={<FaMicrosoft className="text-blue-600" />}
                title="OneDrive"
                status="Perlu koneksi"
                description="Import kontrak dari OneDrive"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
