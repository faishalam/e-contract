import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { toast } from 'react-toastify';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import { useRouter } from 'next/navigation';

export default function ButtonHeader() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex items-center justify-start gap-2">
        <Button
          onClick={() => router.push('/merchant-management/create')}
          className="w-full"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Tambah Merchant
        </Button>
        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<ImportExportIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Import Merchant
        </Button>

        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<ImportExportIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Export Data
        </Button>
        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<EmailIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Kirim Undangan
        </Button>
      </div>

      <div className="w-1/3 flex items-center justify-end gap-2">
        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<FilterAltIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          className="!shadow !p-2 !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<ViewCompactIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        ></Button>
        <Button
          variant="contained"
          className="!shadow !p-2 !bg-white !text-gray-500 !border !border-gray-300"
          startIcon={<FormatListBulletedIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        ></Button>
      </div>
    </>
  );
}
