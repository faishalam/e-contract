'use client';

import { Skeleton } from '@mui/material';

export default function CardHeaderSkeleton() {
  return (
    <>
      {/* {Array.from({ length: 6 }).map((_, i) => ( */}
      <div className="w-full bg-white rounded-md shadow-sm p-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          {/* Title placeholder */}
          <Skeleton variant="text" width={100} height={24} />

          {/* Icon placeholder */}
          <Skeleton variant="circular" width={40} height={40} />
        </div>

        {/* Value section */}
        <div className="mt-3 flex flex-col gap-2">
          <Skeleton variant="text" width={80} height={36} />
          {/* Optional: small text below */}
          {/* <Skeleton variant="text" width={60} height={20} /> */}
        </div>
      </div>
      {/* ))} */}
    </>
  );
}
