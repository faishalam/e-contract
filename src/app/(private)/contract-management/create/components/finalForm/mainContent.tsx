import CInput from '@/components/atoms/input';
import { Avatar, Button } from '@mui/material';
import { DroneIcon, HistoryIcon, LockOpenIcon } from 'lucide-react';

type Activity = {
  id: number;
  status: 'success' | 'pending';
  title: string;
  description: string;
  date: string;
};

const activities: Activity[] = [
  {
    id: 1,
    status: 'success',
    title: 'Draf dikirim untuk ditinjau',
    description: 'Draf kontrak dikirim oleh Rini Kusuma',
    date: '09 Agu 2023, 10:30',
  },
  {
    id: 2,
    status: 'success',
    title: 'Ditinjau oleh Legal',
    description: 'Disetujui oleh Ahmad Rizki (Legal)',
    date: '10 Agu 2023, 14:23',
  },
  {
    id: 3,
    status: 'success',
    title: 'Ditinjau oleh Finance',
    description: 'Disetujui oleh Sari Indah (Finance)',
    date: '11 Agu 2023, 09:45',
  },
  {
    id: 4,
    status: 'pending',
    title: 'Menunggu tanda tangan Direktur',
    description: 'Dokumen dikirim ke Budi Santoso untuk ditandatangani',
    date: '11 Agu 2023, 09:45',
  },
  {
    id: 5,
    status: 'pending',
    title: 'Menunggu tanda tangan Mitra',
    description: 'Dokumen dikirim ke Hendra Wijaya untuk ditandatangani',
    date: '11 Agu 2023, 09:45',
  },
];
export default function MainContent() {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full bg-white rounded-md shadow text-black p-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Perjanjian Kerjasama Pengadaan Barang</p>
            <p>
              Status: <span className="text-blue-600">Menunggu Tanda Tangan</span>
            </p>
          </div>

          <div className="bg-blue-50 rounded-md p-4 border-blue-500 mt-4">
            <p className="font-semibold">Panel Integrasi Documen</p>

            <div className="flex flex-col gap-2 w-full mt-2 text-sm">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 w-1/2">SHA256 Hash:</p>
                <CInput placeholder="SHA256 Hash" className="w-full" disabled />
              </div>

              <div className="flex justify-between items-center">
                <p>Status: </p>
                <div>
                  <DroneIcon style={{ fontSize: '0.8rem' }} className="text-white" />
                  <p className="text-green-500">Terverifikasi</p>
                </div>
              </div>

              <div className="w-full flex justify-end">
                <div className="w-1/3 flex gap-2 justify-end items-center">
                  <Button className="w-full !capitalize" startIcon={<LockOpenIcon />}>
                    Hitung Ulang Hash
                  </Button>
                  <Button className="w-full !capitalize" startIcon={<HistoryIcon />}>
                    Riwayat Hash
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-md p-4 border-yellow-500 mt-4">
            <p className="font-semibold">Status Tanda Tangan</p>
            {[1, 2, 3, 4].map(i => (
              <div
                className="flex gap-2 items-center bg-white p-2 rounded-md border-gray-400 border mt-4"
                key={i}
              >
                <Avatar />
                <div className="w-full flex justify-between">
                  <div className="w-full">
                    <p>Ahmad Rizki</p>
                    <p className="text-gray-400">ahmad.rizki@posindonesia.co.id</p>
                  </div>
                  <div className="w-full justify-end items-center flex">
                    <p className="text-green-600">Ditandatangani pada 10 Agu 2023, 14:23</p>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-gray-500 mt-4">Envelope ID: e82a7c9f-43b1-4e92-9a6d-7f8e54321b6c</p>
          </div>

          <div className="p-4 mt-4">
            <p className="font-semibold text-lg mb-2">Audit Trail</p>

            <div className="w-full rounded-md overflow-hidden">
              <div className="p-2 bg-gray-50 text-sm font-medium border border-gray-200">
                Riwayat Aktivitas
              </div>

              <div className="border rounded-md border-gray-200">
                {activities.map(item => (
                  <div key={item.id} className="flex items-start justify-between p-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-1.5 h-6 mt-1 rounded-full ${
                          item.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      ></span>

                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>

                    <p className="text-gray-500 whitespace-nowrap text-xs">{item.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 text-sm flex border border-gray-200 mt-4 rounded-md">
              <div className="flex flex-col w-full">
                <p>Dokumen Final</p>
                <p className="text-xs">Unduk dokumen setelah semua tanda tangan selesai</p>
              </div>

              <div className="w-1/2 gap-2 flex">
                <Button className="!capitalize !bg-white !text-black !text-sm !border !border-gray-400 w-full">
                  Unduh PDF
                </Button>

                <Button className="!capitalize !bg-white !text-black !text-sm !border !border-gray-400 w-full">
                  Lihat Sertifikat Signature
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
