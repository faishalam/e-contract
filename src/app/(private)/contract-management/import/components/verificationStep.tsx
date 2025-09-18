import { FaShieldAlt } from 'react-icons/fa';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ApprovalIcon from '@mui/icons-material/Approval';
import { FaSignature } from 'react-icons/fa';
import DoneIcon from '@mui/icons-material/Done';
import CInput from '@/components/atoms/input';
import { Avatar, Button } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import HistoryIcon from '@mui/icons-material/History';
import CAutoComplete from '@/components/atoms/auto-complete';
import { TextArea } from '@/components/atoms/Input-text-area';

export default function VerificationStep() {
  return (
    <>
      <div className="max-w-full w-full flex flex-col items-center gap-6">
        <div className="lg:max-w-6xl max-w-full w-full flex md:flex-row flex-col gap-6 justify-center items-center">
          <div className="w-full flex flex-col bg-white rounded-md shadow h-full">
            <div className="border-b flex items-center gap-2 p-6">
              <FaShieldAlt style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Integrasi Document</p>
            </div>

            <div className="w-full p-6 flex flex-col gap-4">
              <div className="w-full bg-[#f0fef4] p-4 border border-green-300 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="bg-[#22c55e] rounded-full w-4 h-4 flex justify-center items-center">
                    <DoneIcon style={{ fontSize: '0.8rem' }} className="text-white" />
                  </div>
                  <p className="text-green-800 font-medium">Status: Terverifikasi!</p>
                </div>
                <p className="text-green-700 text-sm ml-6">Document belum dimodifikasi</p>
              </div>

              <div className="text-black flex flex-col gap-4">
                <CInput label="SHA256 Hash" disabled value={'123ui1uhej1nmebjkhheo12iu3i'} />

                <div className="w-full flex gap-2 justify-center items-center">
                  <Button
                    variant="contained"
                    className="w-full !shadow-none !capitalize !bg-white !text-blue-500 !border-blue-500 !border"
                    startIcon={<LoopIcon />}
                  >
                    Hitung Ulang Hash
                  </Button>
                  <Button
                    variant="contained"
                    className="w-full !shadow-none !capitalize !bg-white !text-black !border-gray-300 !border"
                    startIcon={<HistoryIcon />}
                  >
                    Riwayat Hash
                  </Button>
                </div>
                <div className="border-b mt-4 border-gray-300"></div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-black">Metadata Verifikasi</p>
                <div className="flex w-full text-black text-sm justify-between">
                  <div>
                    <p className="text-gray-500">Metadata verifikasi:</p>
                    <p className="text-gray-500">Algoritma:</p>
                    <p className="text-gray-500">Ukuran File:</p>
                  </div>

                  <div>
                    <p>15 Agus 2023, 14:32 WIB</p>
                    <p>SHA-256</p>
                    <p>2.4 mb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col bg-white rounded-md shadow">
            <div className="border-b p-4 flex items-center gap-2">
              <ApprovalIcon style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Stempel Document</p>
            </div>

            <div className="w-full p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="bg-blue-100 rounded-full p-5">
                  <ApprovalIcon style={{ fontSize: '1.5rem' }} className="text-blue-600" />
                </div>
                <p className="text-gray-500">Tambahkan stempel digital resmi POS Indonesia</p>
              </div>

              <div className="flex flex-col gap-4 text-black">
                <CAutoComplete label="Jenis Stampel" className="w-full" options={[]} />
                <CAutoComplete label="Posisi Stempel" className="w-full" options={[]} />
                <div className="flex flex-col w-full gap-1">
                  <span className="text-xs">Petugas Stempel</span>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <div className="flex text-sm gap-2">
                      <Avatar />
                      <div className="flex flex-col">
                        <p>Budi Santoso</p>
                        <p className="text-xs text-gray-500">Legal Officer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <TextArea label="Catatan Stampel" />
              </div>

              <Button
                startIcon={<ApprovalIcon />}
                variant="contained"
                className="w-full !shadow-none !capitalize !border-gray-300 !border"
              >
                Terapkan Stempel Sigital
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:max-w-6xl max-w-full w-full flex md:flex-row flex-col gap-6 justify-center items-center">
          <div className="w-full flex flex-col bg-white rounded-md shadow h-full">
            <div className="border-b flex items-center gap-2 p-6">
              <FaSignature style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Status Tanda Tangan</p>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div className="w-full bg-green-50 p-4 border border-green-300 rounded-md flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <DoneIcon style={{ fontSize: '1rem' }} className="text-green-500" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-green-800 font-medium">
                      Ditandatangani oleh PT Teknologi Maju Indonesia
                    </p>
                    <p className="text-green-700 text-sm">Document belum dimodifikasi</p>
                  </div>
                </div>

                <div className="">
                  <div className="bg-green-200 rounded-xl">
                    <p className="text-green-800 text-sm px-3 py-1">Selesai</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-yellow-50 p-4 border border-yellow-300 rounded-md flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <AccessTimeFilledIcon
                      style={{ fontSize: '1rem' }}
                      className="text-yellow-500"
                    />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-yellow-800 font-medium">
                      Ditandatangani oleh PT Teknologi Maju Indonesia
                    </p>
                    <p className="text-yellow-700 text-sm">Menunggu tanda tangan POS Indonesia</p>
                  </div>
                </div>

                <div className="">
                  <div className="bg-yellow-200 rounded-xl">
                    <p className="text-yellow-700 text-sm px-3 py-1">Pending</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-gray-50 p-4 border border-gray-300 rounded-md">
                <div className="flex flex-col justify-start items-start w-full">
                  <p className="text-black font-medium">Employee ID</p>
                  <p className="text-gray-400 text-sm">ENV-2023-08-15-TMI-001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
