export default function MerchantFormSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-10 text-black bg-white p-6 rounded-md shadow">
        <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-6">
          {/* Left Column */}
          <div className="w-full flex flex-col gap-4">
            {/* Company Name Skeleton */}
            <div className="w-full">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* NPWP Skeleton */}
            <div className="w-full">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Industry Skeleton */}
            <div className="w-full">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full flex flex-col gap-4">
            {/* Brand Name Skeleton */}
            <div className="w-full">
              <div className="h-4 w-36 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* NIB Skeleton */}
            <div className="w-full">
              <div className="h-4 w-44 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Company Size Skeleton */}
            <div className="w-full">
              <div className="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="w-full flex flex-col gap-4">
          {/* Address Textarea Skeleton */}
          <div className="w-full">
            <div className="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-28 w-full bg-gray-200 rounded animate-pulse" />
          </div>

          {/* City, Province, Postal Code Row */}
          <div className="w-full flex gap-6 items-center">
            {/* City Skeleton */}
            <div className="w-full">
              <div className="h-4 w-16 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Province Skeleton */}
            <div className="w-full">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Postal Code Skeleton */}
            <div className="w-full">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-black bg-white p-6 rounded-md shadow">
        <div className="w-full">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
        </div>
        <div className="w-full md:flex lg:flex-row flex-col justify-center items-center gap-5">
          {/* Left Column */}

          <div className="w-full flex flex-col gap-4">
            {/* Company Name Skeleton */}
            <div className="w-full">
              <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* NPWP Skeleton */}
            <div className="w-full">
              <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full flex flex-col gap-4">
            {/* Brand Name Skeleton */}
            <div className="w-full">
              <div className="h-4 w-36 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-11 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* NIB Skeleton */}
            <div className="w-full">
              <div className="h-4 w-44 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-11 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
