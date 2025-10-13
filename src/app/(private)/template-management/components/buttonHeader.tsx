import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { toast } from 'sonner';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import useTemplateManagementHooks from '../hooks';

export default function ButtonHeader() {
  const { onCreateNew } = useTemplateManagementHooks();
  return (
    <>
      <div className="w-full flex items-center justify-start gap-2">
        <Button
          onClick={onCreateNew}
          className="w-full !rounded-md"
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Tambah Template
        </Button>
        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
          startIcon={<ImportExportIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Import Template
        </Button>

        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
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
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
          startIcon={<EmailIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Kirim Undangan
        </Button>
      </div>

      <div className="w-1/3 flex items-center justify-end gap-2 !rounded-md">
        <Button
          variant="contained"
          fullWidth
          className="!shadow !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
          startIcon={<FilterAltIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          className="!shadow !p-2 !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
          startIcon={<ViewCompactIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        ></Button>
        <Button
          variant="contained"
          className="!shadow !p-2 !bg-white !text-gray-500 !border !border-gray-300 !rounded-md"
          startIcon={<FormatListBulletedIcon />}
          onClick={() => {
            toast.error('Fitur belum tersedia');
          }}
        ></Button>
      </div>
    </>
  );
}
