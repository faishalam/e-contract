import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function CardTemplateSkeleton() {
  const skeletons = Array(6).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between w-full"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-1">
                <Skeleton variant="text" width="80%" height={20} />
                <Skeleton variant="text" width="50%" height={14} />
              </div>
            </div>
            <Skeleton variant="rounded" width={60} height={24} />
          </div>

          {/* Description */}
          <div className="mb-4">
            <Skeleton variant="text" width="100%" height={14} />
            <Skeleton variant="text" width="90%" height={14} />
          </div>

          {/* Info dibuat oleh & tanggal */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <Skeleton variant="text" width="40%" height={14} />
            <Skeleton variant="text" width="30%" height={14} />
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
            <Skeleton variant="text" width="20%" height={14} />
            <div className="flex items-center gap-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
