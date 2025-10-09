'use client';

import { Skeleton } from '@mui/material';

export default function UserListSkeleton() {
  return (
    <div className="bg-white w-full p-4 rounded-md shadow-sm ">
      <div className="flex justify-between items-center gap-4 w-full mb-4">
        <Skeleton variant="rectangular" height={40} width="100%" className="rounded-md" />
      </div>

      <div className="w-full">
        <Skeleton variant="rectangular" height={400} className="rounded-md mb-2" />
      </div>
    </div>
  );
}
