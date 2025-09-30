import Image from 'next/image';
import SecurityIcon from '@mui/icons-material/Security';
import { FaSignature } from 'react-icons/fa';
import ShowChartIcon from '@mui/icons-material/ShowChart';

export default function LeftPanel() {
  return (
    <>
      <Image
        alt="bg.jpg"
        src="https://images.unsplash.com/photo-1744998072601-06653d23424c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="brightness-75"
        fill
        style={{ objectFit: 'cover' }}
        priority
        unoptimized
      />

      <div className="absolute inset-0 bg-blue-500/50"></div>

      <div className="relative z-10 w-full flex justify-center items-center h-screen">
        <div className="flex max-w-xl w-full h-full items-center">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white w-fit h-fit flex justify-center items-center rounded-lg p-2">
                <p className="text-blue-400 font-semibold">POS</p>
              </div>

              <div className="flex flex-col">
                <p className="text-xl font-bold text-white">eContract</p>
                <p className="text-white text-sm">PT.POS Indonesia</p>
              </div>
            </div>

            <div className="text-white">
              <p className="text-3xl font-semibold">Selamat Datang di Sistem Kontrak Digital</p>
              <p className="mt-2">
                Kelola, tanda tangan, dan pantau semua kontrak perusahaan dengan mudah dan aman.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6 mt-10">
              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <SecurityIcon className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Keamanan Tingkat Enterprise</p>
                  <p className="text-white text-md">
                    Enkripsi end-to-end dan verifikasi hash SHA256
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <FaSignature className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Tanda Tangan Digital</p>
                  <p className="text-white text-md">Integrasi dengan DocuSign, Privy, dan VIDA</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <ShowChartIcon className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Analytics & Reporting</p>
                  <p className="text-white text-md">Dashboard lengkap untuk monitoring kontrak</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
