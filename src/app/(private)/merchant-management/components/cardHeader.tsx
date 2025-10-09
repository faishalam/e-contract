import { ReactNode } from 'react';
import CardSkeleton from './cardLoadingSkeleton';
import useProfileProvider from '@/context/profileProvider/hooks';
// import useMerchantManagement from '../hooks';
// import CardSkeleton from './cardLoadingSkeleton';

type CardHeaderProps = {
  title: string;
  icon: ReactNode;
  value: number;
  // conclusion: string;
  // trend?: 'up' | 'down' | 'neutral';
  // progress?: number;
};

export default function CardHeader({
  title,
  icon,
  value,
  // conclusion,
  // trend = 'neutral',
  // progress,
}: CardHeaderProps) {
  // const trendColor =
  //   trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600';
  const { isLoadingDataProfile } = useProfileProvider();

  return (
    <>
      {isLoadingDataProfile ? (
        <CardSkeleton />
      ) : (
        <div className="w-full bg-white rounded-md shadow-sm p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-medium">{title}</p>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              {icon}
            </div>
          </div>
          {/* Value & Conclusion */}
          <div className="mt-3 flex w-full flex-col items-start gap-2">
            <p className="text-2xl text-black font-bold">{value}</p>
            {/* <p className={`text-sm ${trendColor}`}>{conclusion}</p> */}
          </div>

          {/* Progress bar (opsional) */}
          {/* {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="h-2 rounded-full bg-orange-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-600 mt-1">{progress}% used of monthly quota</p>
        </div>
      )} */}
        </div>
      )}
    </>
  );
}
