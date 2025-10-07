'use client';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MerchantDetailHeader from './components/merchantDetailHeader';
import { useParams, useRouter } from 'next/navigation';
import ActivityTabs from './components/activeTabs';

export default function DetailMerchantPage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full flex justify-between items-center">
        <div className="text-black flex flex-col w-full">
          <p className="text-2xl font-bold">Detail Management</p>
          <p className="text-sm text-gray-700">Informasi lengkap merchant dan manajemen template</p>
        </div>
        <div className="w-full flex justify-end">
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            color="secondary"
            className="!rounded-md"
            onClick={() => {
              router.push(`/merchant-management/${id}`);
            }}
          >
            Edit Merchant
          </Button>
        </div>
      </div>

      <MerchantDetailHeader />

      <ActivityTabs />
    </div>
  );
}
