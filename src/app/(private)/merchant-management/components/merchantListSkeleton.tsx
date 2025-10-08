'use client';

import { Skeleton } from '@mui/material';

export default function MerchantListSkeleton() {
  return (
    <div className="bg-white w-full p-4 rounded-md shadow-sm">
      <Skeleton variant="text" width={160} height={32} className="mb-4" />

      <div className="flex justify-between items-center gap-4 w-full mb-4">
        <Skeleton variant="rectangular" height={40} width="33%" className="rounded-md" />
        <Skeleton variant="rectangular" height={40} width="20%" className="rounded-md" />
      </div>

      <div className="w-full">
        <Skeleton variant="rectangular" height={350} className="rounded-md mb-2" />
      </div>
    </div>
  );
}
