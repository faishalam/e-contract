import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ApprovalIcon from '@mui/icons-material/Approval';
import { FaSignature } from 'react-icons/fa';
import DoneIcon from '@mui/icons-material/Done';
import CInput from '@/components/atoms/input';
import { Button } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';
import ChecklistIcon from '@mui/icons-material/Checklist';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function InformationStep() {
  return (
    <>
      <div className="max-w-full w-full flex flex-col items-center gap-6">
        <div className="lg:max-w-6xl max-w-full w-full flex md:flex-row flex-col gap-6 justify-center items-center">
          <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg flex justify-between items-center">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-2 flex items-center justify-center">
                <CheckCircleIcon className="text-white" fontSize="small" />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Kontrak Berhasil Diproses!</p>
                <p className="text-sm">
                  Perjanjian Kemitraan Teknologi dengan PT Teknologi Maju Indonesia telah selesai
                  diverifikasi dan distempel
                </p>
              </div>
            </div>

            <div className="text-right text-sm">
              <p className="opacity-80">Diselesaikan pada</p>
              <p className="font-bold">15 Agu 2023, 15:42 WIB</p>
            </div>
          </div>
        </div>
        <div className="lg:max-w-6xl max-w-full w-full flex md:flex-row flex-col gap-6 justify-center items-center">
          <div className="w-full flex flex-col bg-white rounded-md shadow h-full">
            <div className="border-b flex items-center gap-2 p-6">
              <PermDeviceInformationIcon style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Informasi Documen</p>
            </div>

            <div className="w-full p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full flex gap-2">
                  <div className="text-black w-full">
                    <p className="text-sm">Judul Kontrak</p>
                    <p>Perjanjian Kemitraan Teknologi</p>
                  </div>
                  <div className="text-black w-full">
                    <p className="text-sm">Mitra</p>
                    <p>PT Teknologi Maju Indonesia</p>
                  </div>
                </div>

                <div className="w-full flex gap-2">
                  <div className="text-black w-full">
                    <p className="text-sm">Nilai Kontrak</p>
                    <p>Rp. 2.500.000.000</p>
                  </div>
                  <div className="text-black w-full">
                    <p className="text-sm">Periode</p>
                    <p>15 Agustus 2023 - 15 Agustus 2025</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-green-50 p-4 border border-green-300 rounded-md flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-green-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <DoneIcon style={{ fontSize: '1rem' }} className="text-green-500" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-green-800 font-medium">Integarsi Terverifikasi</p>
                    <p className="text-green-700 text-sm">
                      SHA-256 Hash tersimpan dan telah terverifikasi
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="bg-green-200 rounded-xl">
                    <p className="text-green-800 text-sm px-3 py-1">Valid</p>
                  </div>
                </div>
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

          <div className="w-full md:w-1/2 flex flex-col bg-white rounded-md shadow h-full">
            <div className="border-b flex items-center gap-2 p-6">
              <DownloadIcon style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Unduh Documen</p>
            </div>

            <div className="text-black flex flex-col gap-4 p-6">
              <Button
                variant="contained"
                className="w-full !shadow-none !capitalize"
                startIcon={<PictureAsPdfIcon />}
              >
                Unduh PDF Final
              </Button>
              <Button
                variant="contained"
                className="w-full !shadow-none !capitalize !bg-white !text-black !border-gray-300 !border"
                startIcon={<FaSignature />}
              >
                Sertifikat eSignature
              </Button>
              <Button
                variant="contained"
                className="w-full !shadow-none !capitalize !bg-white !text-black !border-gray-300 !border"
                startIcon={<ApprovalIcon />}
              >
                Bukti Sample Digital
              </Button>
              <div className="border-b mt-4 border-gray-300"></div>
            </div>

            <div className="flex flex-col text-sm p-6">
              <p className="text-gray-500">File size : 2.4 mb</p>
              <p className="text-gray-500">Format: PDF/A-1b</p>
            </div>
          </div>
        </div>

        <div className="lg:max-w-6xl max-w-full w-full flex md:flex-row flex-col gap-6 justify-center items-center">
          <div className="w-full flex flex-col bg-white rounded-md shadow h-full">
            <div className="border-b flex items-center gap-2 p-6">
              <ChecklistIcon style={{ fontSize: '1.5rem' }} className="text-blue-600" />
              <p className="text-md font-medium text-black">Log Aktivitas Documen</p>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div className="w-full bg-green-50 p-4 border border-green-300 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="bg-green-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <DoneIcon style={{ fontSize: '1rem' }} className="text-green-500" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-green-800 font-medium">
                      Stempel digital berhasil diterapkan
                    </p>
                    <p className="text-green-700 text-sm">
                      Stempel resmi POS Indonesia - Posisi : Halaman terakhir, kanan bawah
                    </p>
                    <p className="text-green-700 text-xs">15 Agu 2023, 15:32 WIB - Budi Santoso</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-blue-50 p-4 border border-blue-300 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <QuestionMarkIcon style={{ fontSize: '1rem' }} className="text-blue-500" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-blue-800 font-medium">Verifikasi integrasi selesai</p>
                    <p className="text-blue-700 text-sm">
                      Hash SHA-256 berhasil dihitung dan disimpan
                    </p>
                    <p className="text-blue-700 text-xs">15 Agu 2023, 15:40 WIB - System</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-purple-50 p-4 border border-purple-300 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <FaSignature style={{ fontSize: '1rem' }} className="text-purple-500" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-purple-800 font-medium">Tanda tangan digital diterima</p>
                    <p className="text-purple-700 text-sm">
                      Ditandatangani oleh POS Indonesia (Budi Santoso)
                    </p>
                    <p className="text-purple-700 text-xs">15 Agu 2023, 15:40 WIB - DocuSign</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-orange-50 p-4 border border-orange-300 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-200 rounded-full w-4 h-4 p-4 flex justify-center items-center">
                    <FaSignature style={{ fontSize: '1rem' }} className="text-orange-900" />
                  </div>
                  <div className="flex flex-col justify-start items-start w-full">
                    <p className="text-orange-800 font-medium">Tanda tangan mitra diterima</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
