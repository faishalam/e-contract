import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ForumIcon from '@mui/icons-material/Forum';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

export default function RightPanel() {
  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <TipsAndUpdatesIcon className="text-yellow-500" />
            <p className="text-md text-black font-medium">Tips Pengisian</p>
          </div>
          <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
            <div className="flex items-start gap-2">
              <div className="bg-blue-200 w-5 h-5 flex items-center justify-center rounded-full p-1">
                <CheckIcon className="w-full" style={{ fontSize: '0.9rem' }} />
              </div>
              <div>
                <p className="text-xs font-medium">Lengkapi semua field wajib (*)</p>
                <p className="text-gray-500 text-xs">
                  Field yang ditandai asterisk harus diisi untuk melanjutkan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-green-200 w-5 h-5 flex items-center justify-center rounded-full p-1">
                <EditDocumentIcon
                  className="w-full text-green-700"
                  style={{ fontSize: '0.9rem' }}
                />
              </div>
              <div>
                <p className="text-xs font-medium">Upload dokumen yang jelas</p>
                <p className="text-gray-500 text-xs">
                  Pastikan dokumen terbaca dengan baik untuk mempercepat verifikasi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-purple-200 w-5 h-5 flex items-center justify-center rounded-full p-1">
                <EmailIcon className="w-full text-purple-700" style={{ fontSize: '0.9rem' }} />
              </div>
              <div>
                <p className="text-xs font-medium">Gunakan email perusahaan</p>
                <p className="text-gray-500 text-xs">
                  Email dengan dokumen perusahaan akan mempercepat verifikasi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="bg-orange-200 w-5 h-5 flex items-center justify-center rounded-full p-1">
                <LocalPhoneIcon className="w-full text-orange-700" style={{ fontSize: '0.9rem' }} />
              </div>
              <div>
                <p className="text-xs font-medium">Pastikan Kontak Aktif</p>
                <p className="text-gray-500 text-xs">
                  Kami akan menghubungi untuk verifikasi dan aktivasi akun
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow">
          <div className="flex w-full gap-2 items-center p-4 border-b">
            <SupportAgentIcon className="text-blue-500" />
            <p className="text-md text-black font-medium">Butuh Bantuan</p>
          </div>

          <div className="text-black text-xs flex flex-col gap-3 p-6">
            <p>Tim support siap membantu Anda:</p>
            <div className="flex items-center gap-2">
              <EmailIcon className="text-blue-500" style={{ fontSize: '0.9rem' }} />
              <p>support@pos-econtract.com</p>
            </div>

            <div className="flex items-center gap-2">
              <LocalPhoneIcon className="text-blue-500" style={{ fontSize: '0.9rem' }} />
              <p>021-123-4567</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <WhatsAppIcon className="text-green-500" style={{ fontSize: '0.9rem' }} />
              <p>0812-3456-789</p>
            </div>

            <Button
              onClick={() => toast.error('Fitur belum tersedia')}
              color="secondary"
              className="w-full"
              startIcon={<ForumIcon />}
              variant="contained"
            >
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
