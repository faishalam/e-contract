import CInputFileCustom from '@/components/atoms/input-file-custom';
import ImportCard from './importCard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { FaGoogleDrive, FaDropbox, FaMicrosoft } from 'react-icons/fa';
import { FaSignature } from 'react-icons/fa';
import { FaFileSignature } from 'react-icons/fa';
import { FaShieldAlt } from 'react-icons/fa';

export default function SourceStep() {
  return (
    <>
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="lg:max-w-6xl md:max-w-lg max-w-sm w-full flex flex-col gap-6">
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-2xl font-bold text-black">Pilih Sumber Import</p>
            <p className="text-sm text-gray-700">
              Pilih dari mana Anda ingin mengimport document kontrak.
            </p>
          </div>
          <div className="w-full justify-center items-center">
            <div className="flex flex-col lg:flex-row gap-4 w-full justify-center items-center">
              <CInputFileCustom
                type="file"
                title="Upload File"
                description="Unggah dokumen kontrak dari komputer Anda"
                subDescription="Format didukung: PDF, DOC, DOCX • Maksimal 50MB"
                icon={<CloudUploadIcon sx={{ fontSize: 48, color: '#2563eb' }} />}
                accept=".pdf,.doc,.docx"
                onChangeFile={file => console.log('Selected file:', file)}
                active
              />
              <CInputFileCustom
                type="file"
                title="Scan Dokumen"
                description="Scan dokumen fisik menggunakan kamera atau scanner"
                subDescription="Otomatis OCR untuk ekstraksi teks • Hingga 300 DPI"
                icon={<DocumentScannerIcon sx={{ fontSize: 48, color: '#9ca3af' }} />}
                onClick={() => console.log('Scan Dokumen')}
              />
            </div>
          </div>
        </div>
        <div className="lg:max-w-6xl md:max-w-lg max-w-sm w-full flex flex-col justify-center gap-6">
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-xl font-medium text-black">Import dari Cloud Storage</p>
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
        <div className="lg:max-w-6xl md:max-w-lg max-w-sm w-full flex flex-col justify-center gap-6">
          <div className="w-full flex flex-col justify-center items-center">
            <p className="text-xl font-medium text-black">Import dari Platform e-Signature</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
            <ImportCard
              icon={<FaSignature className="text-[#cb8e0a]" />}
              title="DocuSign"
              status="Terhubung"
              description="Import kontrak yang sudah ditandatangani"
              background="bg-[#fdfac3]"
            />
            <ImportCard
              icon={<FaFileSignature className="text-[#9233ea]" />}
              title="PrivyID"
              status="Perlu koneksi"
              description="Import dari platform tanda tangan digital Indonesia"
              background="bg-[#f3e8ff]"
            />
            <ImportCard
              icon={<FaShieldAlt className="text-[#16a34b" />}
              title="VIDA"
              status="Perlu koneksi"
              description="Import VIDA Digital Signature"
              background="bg-[#dcfce7]"
            />
          </div>
        </div>

        <div className="lg:max-w-5xl md:max-w-lg max-w-sm w-full flex flex-col justify-center gap-6">
          <div className="w-full flex flex-col justify-center items-start">
            <p className="text-xl font-medium text-black">Opsi Tambahan</p>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex w-full rounded-md hover:shadow-sm bg-white border">
              <div className="w-full p-5 flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
                  <LinkIcon className="text-black" />
                </div>
                <div className="flex flex-col">
                  <p className="flex text-sm text-black">Import dari URL</p>
                  <p className="flex text-sm text-gray-500">Import document dari link/URL</p>
                </div>
              </div>
            </div>

            <div className="flex w-full rounded-md hover:shadow-sm bg-white border">
              <div className="w-full p-5 flex items-center gap-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100">
                  <EmailIcon className="text-black" />
                </div>
                <div className="flex flex-col">
                  <p className="flex text-sm text-black">Import dari Email</p>
                  <p className="flex text-sm text-gray-500">Import attachment dari email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
