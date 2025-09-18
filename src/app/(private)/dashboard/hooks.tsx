'use client';

import { createContext, useContext, useMemo } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GestureIcon from '@mui/icons-material/Gesture';
import ErrorIcon from '@mui/icons-material/Error';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ColDef } from '@ag-grid-community/core';

type Partner = {
  name: string;
  email: string;
  type: string;
  status: string;
  contracts: string;
};

const useDashboardHooks = () => {
  const statisticsHeader = [
    {
      title: 'Contracts Pending Approval',
      icon: <AccessTimeIcon className="text-orange-500" />,
      value: 12,
      conclusion: '↑ 3 from last week',
      trend: 'up' as const,
    },
    {
      title: 'Signed Contracts',
      icon: <EditIcon className="text-blue-500" />,
      value: 8,
      conclusion: '↓ 2 from last week',
      trend: 'down' as const,
    },
    {
      title: 'Partnerships',
      icon: <CheckCircleIcon className="text-green-500" />,
      value: 47,
      conclusion: '↑ 15 from last month',
      trend: 'up' as const,
    },
    {
      title: 'e-Sign Quota Remaining',
      icon: <GestureIcon className="text-purple-500" />,
      value: 234,
      conclusion: '',
      progress: 65,
    },
  ];

  const platformActivityData = [
    { name: 'Jan', newContracts: 42, completedContracts: 35, newUsers: 12, quota: 6 },
    { name: 'Feb', newContracts: 48, completedContracts: 33, newUsers: 8, quota: 7 },
    { name: 'Mar', newContracts: 40, completedContracts: 38, newUsers: 15, quota: 5 },
    { name: 'Apr', newContracts: 41, completedContracts: 40, newUsers: 10, quota: 6 },
    { name: 'May', newContracts: 45, completedContracts: 42, newUsers: 13, quota: 8 },
    { name: 'Jun', newContracts: 47, completedContracts: 44, newUsers: 12, quota: 9 },
    { name: 'Jul', newContracts: 50, completedContracts: 46, newUsers: 18, quota: 10 },
  ];

  const activitiesData = [
    {
      icon: <AssignmentIcon className="text-blue-500" />,
      text: `Budi signed "Logistics Service Agreement"`,
      time: 'Today, 10:45 AM',
    },
    {
      icon: <CheckCircleIcon className="text-green-500" />,
      text: `Contract "IT Service Agreement" completed`,
      time: 'Today, 09:30 AM',
    },
    {
      icon: <AccessTimeIcon className="text-yellow-500" />,
      text: `Waiting for approval: "Marketing Partnership"`,
      time: 'Yesterday, 16:20 PM',
    },
    {
      icon: <EditIcon className="text-purple-500" />,
      text: `You created "Supply Chain Agreement"`,
      time: 'Yesterday, 14:05 PM',
    },
    {
      icon: <ErrorIcon className="text-red-500" />,
      text: `"Vendor Agreement" expires in 7 days`,
      time: 'Yesterday, 11:30 AM',
    },
  ];

  const dataGrid = [
    {
      title: 'Logistics Service Agreement',
      ref: 'LSA-2023-0045',
      parties: 'POS Indonesia with PT Sinar Logistik',
      status: 'Pending Signature',
      statusColor: 'gold',
      created: 'June 28, 2023',
      expiry: 'June 28, 2024',
    },
    {
      title: 'IT Service Agreement',
      ref: 'ITSA-2023-0078',
      parties: 'POS Indonesia with PT Teknologi Maju',
      status: 'Signed',
      statusColor: 'green',
      created: 'June 15, 2023',
      expiry: 'Dec 15, 2023',
    },
    {
      title: 'Marketing Partnership',
      ref: 'MKT-2023-0032',
      parties: 'POS Indonesia with PT Media Kreatif',
      status: 'Under Review',
      statusColor: 'purple',
      created: 'June 25, 2023',
      expiry: '-',
    },
    {
      title: 'Supply Chain Agreement',
      ref: 'SCA-2023-0012',
      parties: 'POS Indonesia with PT Suplai Cepat',
      status: 'Draft',
      statusColor: 'gray',
      created: 'June 30, 2023',
      expiry: '-',
    },
    {
      title: 'Vendor Agreement',
      ref: 'VA-2022-0098',
      parties: 'POS Indonesia with PT Vendor Utama',
      status: 'Expiring Soon',
      statusColor: 'red',
      created: 'July 10, 2022',
      expiry: 'July 10, 2023',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeContractsColumnDef: any[] = useMemo(
    () => [
      {
        headerName: 'Title',
        field: 'title',
        flex: 2,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <div>
            <div className="font-semibold">{params.data.title}</div>
            <div className="text-xs text-gray-500">REF: {params.data.ref}</div>
          </div>
        ),
      },
      { headerName: 'Parties', field: 'parties', flex: 2 },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        cellRenderer: params => (
          <span
            style={{
              backgroundColor: params.data.statusColor,
              padding: '4px 8px',
              borderRadius: '12px',
              color: 'white',
              fontSize: '12px',
            }}
          >
            {params.value}
          </span>
        ),
      },
      { headerName: 'Created', field: 'created', flex: 1 },
      { headerName: 'Expiry', field: 'expiry', flex: 1 },
      {
        headerName: 'Actions',
        field: 'actions',
        flex: 1,
        cellRenderer: () => (
          <div className="flex gap-2">
            <button title="View">👁️</button>
            <button title="Download">⬇️</button>
            <button title="Edit">✏️</button>
          </div>
        ),
      },
    ],
    [],
  );

  const recentPartnersColumnDef: ColDef<Partner>[] = useMemo(
    () => [
      {
        headerName: 'Name',
        field: 'name',
        flex: 2,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <div>
            <div className="font-semibold">{params.data?.name}</div>
            <div className="text-xs text-gray-500">{params.data?.email}</div>
          </div>
        ),
      },
      { headerName: 'Type', field: 'type', flex: 1 },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
            {params.value}
          </span>
        ),
      },
      { headerName: 'Contracts', field: 'contracts', flex: 1 },
    ],
    [],
  );

  const partners: Partner[] = [
    {
      name: 'PT Sinar Logistik',
      email: 'logistics@sinarlogistik.co.id',
      type: 'Corporate',
      status: 'Active',
      contracts: '3 active',
    },
    {
      name: 'PT Teknologi Maju',
      email: 'contact@teknologimaju.com',
      type: 'Corporate',
      status: 'Active',
      contracts: '1 active',
    },
    {
      name: 'PT Media Kreatif',
      email: 'info@mediakreatif.id',
      type: 'Corporate',
      status: 'Active',
      contracts: '2 active',
    },
  ];

  const quotas = [
    { label: 'e-Sign Quota', used: 234, total: 360 },
    { label: 'e-Stamp Quota', used: 78, total: 120 },
  ];

  const quickAccess = [
    {
      label: 'Create New Contract',
      icon: <DescriptionIcon className="text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      label: 'Add New Partner',
      icon: <GroupAddIcon className="text-green-500" />,
      color: 'bg-green-50',
    },
    {
      label: 'Import Templates',
      icon: <ImportContactsIcon className="text-purple-500" />,
      color: 'bg-purple-50',
    },
    {
      label: 'View Reports',
      icon: <BarChartIcon className="text-orange-500" />,
      color: 'bg-orange-50',
    },
  ];

  return {
    recentPartnersColumnDef,
    partners,
    statisticsHeader,
    activeContractsColumnDef,
    dataGrid,
    platformActivityData,
    activitiesData,
    quotas,
    quickAccess,
  };
};

const UseDashboardContext = createContext<ReturnType<typeof useDashboardHooks> | undefined>(
  undefined,
);

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useDashboardHooks();
  return <UseDashboardContext.Provider value={value}>{children}</UseDashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(UseDashboardContext);
  if (context === undefined) {
    throw new Error('useUseDashboardContext must be used within an DashboardProvider');
  }
  return context;
};
export default useDashboard;
