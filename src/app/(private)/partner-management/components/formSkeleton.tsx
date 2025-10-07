import { Skeleton } from '@mui/material';

export default function FormSkeleton() {
  return (
    <div className="overflow-y-scroll max-h-[78vh] no-scrollbar p-8 flex flex-col w-full gap-10">
      {/* Basic Information */}
      <div className="flex flex-col w-full gap-3">
        <Skeleton variant="text" width={180} height={28} />
        <div className="flex flex-col w-full gap-4">
          {/* Partner Name */}
          <Skeleton variant="rectangular" height={48} className="rounded-md" />

          {/* Type + NPWP */}
          <div className="flex w-full justify-center items-center gap-4">
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
          </div>

          {/* Address */}
          <Skeleton variant="rectangular" height={80} className="rounded-md" />

          {/* City + Province */}
          <div className="flex w-full justify-center items-center gap-4">
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col w-full gap-3">
        <Skeleton variant="text" width={200} height={28} />
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full justify-center items-center gap-4">
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
            <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
          </div>
        </div>
      </div>

      {/* Legal Information */}
      <div className="flex flex-col w-full gap-3">
        <Skeleton variant="text" width={180} height={28} />
        <Skeleton variant="rectangular" height={48} className="rounded-md w-full" />
        <div className="flex flex-col w-full gap-3 mt-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={200} height={20} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 pt-5 bg-gray-100 p-5 border-t border-gray-200">
        <Skeleton variant="rectangular" width={100} height={40} className="rounded-md" />
        <Skeleton variant="rectangular" width={150} height={40} className="rounded-md" />
      </div>
    </div>
  );
}
