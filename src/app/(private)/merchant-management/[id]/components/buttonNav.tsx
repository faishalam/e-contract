import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ButtonNav() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pb-6">
        {/* Kiri: Simpan Draft */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Button
            variant="contained"
            className="!bg-[#f9fafb] !border !text-black !capitalize !shadow-sm w-60"
            onClick={() => {
              toast.error('Fitur belum tersedia');
            }}
          >
            Simpan sebagai Draft
          </Button>
        </div>

        {/* Kanan: Back / Next */}
        <div className="flex justify-center md:justify-end items-center gap-4 w-full md:w-auto">
          <Button
            onClick={() => {
              router.back();
            }}
            disabled={false}
            variant="contained"
            className="!bg-[#f9fafb] !border !text-black !capitalize !shadow-sm disabled:!opacity-50 w-50"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={false}
            variant="contained"
            color="secondary"
            className="!capitalize !shadow-sm disabled:!opacity-50 w-50"
          >
            Lanjut
          </Button>
        </div>
      </div>
    </>
  );
}
