import FaxIcon from '@mui/icons-material/Fax';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';
import { Button } from '@mui/material';
import { toast } from 'sonner';
import RenderTransactionStatus from '@/components/atoms/render-transaction-status';
import useMerchantManagement from '../../../hooks';
import MerchantDetailSkeleton from './merchantDetailSkeleton';

export default function MerchantDetailHeader() {
  const { dataMerchantById, isLoadingMerchantById } = useMerchantManagement();
  return (
    <>
      {isLoadingMerchantById ? (
        <MerchantDetailSkeleton />
      ) : (
        <div className="w-full bg-white rounded-md shadow p-6">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-6 rounded-xl w-20 h-20 flex items-center justify-center">
                <FaxIcon className="text-blue-600" sx={{ fontSize: 32 }} />
              </div>
              <div className="text-black flex flex-col gap-2">
                <h2 className="font-semibold text-xl">{dataMerchantById?.company_name}</h2>
                <p className="text-gray-500 text-sm">{dataMerchantById?.profile?.company_email}</p>
                <div className="flex items-center gap-2">
                  <RenderTransactionStatus status={dataMerchantById?.status ?? ''} />
                  <RenderTransactionStatus status={dataMerchantById?.profile?.plan ?? ''} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="contained"
                className="!bg-green-600 !text-white hover:!bg-green-700 !rounded-lg !normal-case"
                onClick={() => toast.error('Fitur Belum Tersedia')}
                startIcon={<EmailIcon />}
              >
                Kirim Pesan
              </Button>
              <Button
                variant="contained"
                className="!rounded-lg !bg-gray-300 !border-gray-400 !text-gray-700 !normal-case"
                onClick={() => toast.error('Fitur Belum Tersedia')}
                startIcon={<BlockIcon />}
              >
                Suspend
              </Button>
            </div>
          </div>

          {/* Info Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 pt-6 border-t border-gray-200">
            {/* Informasi Perusahaan */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Informasi Perusahaan</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Industri:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.industry}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">NPWP:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.npwp}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Telepon:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.profile?.company_phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Statistik Penggunaan */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Statistik Penggunaan</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Pengguna:</span>
                  <span className="text-sm font-medium text-gray-900">25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kontrak Aktif:</span>
                  <span className="text-sm font-medium text-gray-900">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Template Digunakan:</span>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
              </div>
            </div>

            {/* Informasi Langganan */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Informasi Langganan</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Paket:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.profile?.plan}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Harga:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.profile?.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Perpanjangan:</span>
                  <span className="text-sm font-medium text-gray-900">15 Feb 2024</span>
                </div>
              </div>
            </div>

            {/* Aktivitas Terakhir */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">Aktivitas Terakhir</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Login Terakhir:</span>
                  <span className="text-sm font-medium text-gray-900">2 jam lalu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kontrak Terakhir:</span>
                  <span className="text-sm font-medium text-gray-900">1 hari lalu</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bergabung:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {dataMerchantById?.profile?.joined_date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
