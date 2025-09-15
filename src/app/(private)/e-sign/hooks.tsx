'use client';

import { ColDef } from '@ag-grid-community/core';
import {
  CalendarToday,
  Description,
  EditNote,
  TrendingUp,
  Verified,
  Visibility,
} from '@mui/icons-material';
import { createContext, useContext, useMemo } from 'react';

type UsageHistory = {
  dateTime: string;
  type: 'e-Sign' | 'e-Stamp';
  usedFor: string;
  user: string;
  status: 'Successful' | 'Failed';
  actions?: string;
};

const useEsignHooks = () => {
  const quotasData = [
    {
      title: 'e-Sign Quota Remaining',
      value: 234,
      total: 360,
      percentage: 65,
      renewalText: '1st of each month',
      icon: <EditNote className="text-blue-500" />,
      accentColor: '#3b82f6',
    },
    {
      title: 'e-Stamp Quota Remaining',
      value: 78,
      total: 120,
      percentage: 65,
      renewalText: '1st of each month',
      icon: <Verified className="text-green-500" />,
      accentColor: '#22c55e',
    },
    {
      title: 'Last Top-Up',
      value: undefined,
      description: 'June 1, 2023\nAdded 100 e-Sign & 50 e-Stamp\nNext scheduled: July 1, 2023',
      icon: <CalendarToday className="text-purple-500" />,
      linkText: 'View Purchase History',
      linkHref: '#',
    },
    {
      title: 'Monthly Usage Trend',
      value: '+12%',
      description: 'vs last month',
      icon: <TrendingUp className="text-orange-500" />,
      accentColor: '#f97316',
      chartData: [10, 12, 14, 15, 16, 20, 22],
      linkText: 'View Detailed Analytics',
      linkHref: '#',
    },
  ];

  const usageStatisticsData = [
    { name: 'Jun 1', eSign: 12, eStamp: 5 },
    { name: 'Jun 5', eSign: 15, eStamp: 8 },
    { name: 'Jun 10', eSign: 10, eStamp: 6 },
    { name: 'Jun 15', eSign: 18, eStamp: 10 },
    { name: 'Jun 20', eSign: 22, eStamp: 12 },
    { name: 'Jun 25', eSign: 16, eStamp: 8 },
    { name: 'Jun 30', eSign: 20, eStamp: 9 },
    { name: 'Jul 4', eSign: 12, eStamp: 5 },
  ];

  const usageHistoryData = [
    {
      id: 1,
      dateTime: 'July 4, 2023 10:45 AM',
      type: 'e-Sign',
      usedFor: 'Logistics Service Agreement',
      user: 'Budi Santoso',
      status: 'Successful',
    },
    {
      id: 2,
      dateTime: 'July 4, 2023 09:30 AM',
      type: 'e-Stamp',
      usedFor: 'IT Service Agreement',
      user: 'Anisa Wijaya',
      status: 'Successful',
    },
    {
      id: 3,
      dateTime: 'July 3, 2023 16:20 PM',
      type: 'e-Sign',
      usedFor: 'Marketing Partnership',
      user: 'Dewi Lestari',
      status: 'Successful',
    },
    {
      id: 4,
      dateTime: 'July 3, 2023 14:05 PM',
      type: 'e-Stamp',
      usedFor: 'Supply Chain Agreement',
      user: 'Anisa Wijaya',
      status: 'Successful',
    },
    {
      id: 5,
      dateTime: 'July 2, 2023 11:30 AM',
      type: 'e-Sign',
      usedFor: 'Vendor Agreement',
      user: 'Rudi Hartono',
      status: 'Failed',
    },
  ];

  const usageHistoryColumnDef: ColDef<UsageHistory>[] = useMemo(
    () => [
      {
        headerName: 'Date & Time',
        field: 'dateTime',
        flex: 2,
      },
      {
        headerName: 'Type',
        field: 'type',
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              params.value === 'e-Sign'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {params.value}
          </span>
        ),
      },
      {
        headerName: 'Used For',
        field: 'usedFor',
        flex: 2,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <div className="flex items-center gap-1">
            <Description fontSize="small" className="text-gray-500" />
            <span>{params.value}</span>
          </div>
        ),
      },
      {
        headerName: 'User',
        field: 'user',
        flex: 1,
      },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              params.value === 'Successful'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {params.value}
          </span>
        ),
      },
      {
        headerName: 'Actions',
        field: 'actions',
        flex: 1,
        cellRenderer: () => (
          <button className="text-blue-600 hover:text-blue-800">
            <Visibility fontSize="small" />
          </button>
        ),
      },
    ],
    [],
  );

  const quotaOptions = [
    {
      id: 'esign',
      name: 'e-Sign Quota',
      description: 'Electronic signature credits',
      unitPrice: 5000,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      id: 'estamp',
      name: 'e-Stamp Quota',
      description: 'Electronic stamp credits',
      unitPrice: 10000,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  return {
    quotaOptions,
    usageHistoryData,
    usageHistoryColumnDef,
    quotasData,
    usageStatisticsData,
  };
};

const EsignContext = createContext<ReturnType<typeof useEsignHooks> | undefined>(undefined);

export const EsignProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useEsignHooks();
  return <EsignContext.Provider value={value}>{children}</EsignContext.Provider>;
};

export const useEsign = () => {
  const context = useContext(EsignContext);
  if (context === undefined) {
    throw new Error('EsignContext must be used within an EsignProvider');
  }
  return context;
};
export default useEsign;
