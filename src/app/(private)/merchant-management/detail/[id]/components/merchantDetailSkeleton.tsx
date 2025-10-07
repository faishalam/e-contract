import { Skeleton } from '@mui/material';

export default function MerchantDetailSkeleton() {
  return (
    <div className="w-full bg-white rounded-md shadow p-6 animate-pulse">
      {/* Header */}
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-6 rounded-xl w-20 h-20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-md"></div>
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width={180} height={28} />
            <Skeleton variant="text" width={120} height={20} />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton variant="rectangular" width={60} height={20} />
              <Skeleton variant="rectangular" width={50} height={20} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={100} height={36} />
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8 pt-6 border-t border-gray-200">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton variant="text" width={160} height={20} />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex justify-between items-center">
                <Skeleton variant="text" width={80} height={18} />
                <Skeleton variant="text" width={100} height={18} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
