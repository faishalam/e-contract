import Image from 'next/image';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

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
              <p className="text-3xl font-semibold">Activasi Akun Anda</p>
              <p className="mt-2">
                Verifikasi identitas Anda untuk mengakses sistem kontrak digital yang aman.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6 mt-10">
              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <MarkEmailReadIcon className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Verifikasi Email</p>
                  <p className="text-white text-md">
                    Kode verifikasi telah dikirim ke emai perusahaan Anda.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <WatchLaterIcon className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Waktu Terbatas</p>
                  <p className="text-white text-md">
                    Kode berlaku selama 15 menit untuk keamanan maksimal
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-400 w-fit h-fit flex justify-center items-center rounded-lg p-3">
                  <AdminPanelSettingsIcon className="text-white" style={{ fontSize: '1.2rem' }} />
                </div>

                <div className="flex flex-col">
                  <p className="text-md font-semibold text-white">Akses Aman</p>
                  <p className="text-white text-md">
                    Setelah aktivasi, Anda dapat mengakases semua fitur sistem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
