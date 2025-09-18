'use client';

import { createContext, useContext, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import DescriptionIcon from '@mui/icons-material/Description';

const useContractManagementHooks = () => {
  const statisticsHeader = [
    {
      title: 'Total Kontrak',
      value: 152,
      conclusion: '↑ 12% dari bulan lalu',
      trend: 'up' as const,
      icon: <DescriptionIcon className="text-blue-500" />,
      iconBg: 'bg-blue-100',
    },
    {
      title: 'Ditandatangani',
      value: 89,
      conclusion: '↑ 8% dari bulan lalu',
      trend: 'up' as const,
      icon: <EditIcon className="text-green-500" />,
      iconBg: 'bg-green-100',
    },
    {
      title: 'Menunggu',
      value: 43,
      conclusion: '— Sama dengan bulan lalu',
      trend: 'neutral' as const,
      icon: <AccessTimeIcon className="text-yellow-500" />,
      iconBg: 'bg-yellow-100',
    },
    {
      title: 'Kedaluwarsa',
      value: 20,
      conclusion: '↓ 5% dari bulan lalu',
      trend: 'down' as const,
      icon: <EventBusyIcon className="text-red-500" />,
      iconBg: 'bg-red-100',
    },
  ];

  const lineData = [
    { month: 'Mar', total: 65, signed: 40, pending: 18, expired: 5 },
    { month: 'Apr', total: 75, signed: 48, pending: 20, expired: 7 },
    { month: 'Mei', total: 82, signed: 55, pending: 23, expired: 9 },
    { month: 'Jun', total: 95, signed: 62, pending: 27, expired: 11 },
    { month: 'Jul', total: 115, signed: 72, pending: 35, expired: 12 },
    { month: 'Agu', total: 150, signed: 88, pending: 43, expired: 20 },
  ];

  const pieData = [
    { name: 'Perjanjian Vendor', value: 45 },
    { name: 'NDA', value: 35 },
    { name: 'MoU', value: 25 },
    { name: 'Perjanjian Pengadaan', value: 20 },
    { name: 'Lainnya', value: 15 },
  ];

  const contractsData = [
    {
      title: 'Perjanjian Pengadaan Jasa IT',
      ref: 'CNTR-2025-001',
      mitra: 'PT Teknologi Maju Indonesia',
      status: 'Ditandatangani',
      statusColor: '#10b981', // green
      createdAt: '20 Jul 2023',
      expiredAt: '20 Jul 2024',
      integritas: 'Terverifikasi',
    },
    {
      title: 'Perjanjian Kerjasama Pengiriman',
      ref: 'CNTR-2025-002',
      mitra: 'CV Logistik Cepat',
      status: 'Menunggu',
      statusColor: '#f59e0b', // orange
      createdAt: '15 Agu 2023',
      expiredAt: '15 Agu 2024',
      integritas: 'Menunggu',
    },
    {
      title: 'NDA - Proyek Digitalisasi',
      ref: 'CNTR-2025-003',
      mitra: 'PT Konsultan Digital',
      status: 'Kedaluwarsa',
      statusColor: '#ef4444', // red
      createdAt: '10 Jan 2023',
      expiredAt: '10 Jan 2024',
      integritas: 'Mismatch',
    },
    {
      title: 'MoU Kerjasama Pelatihan',
      ref: 'CNTR-2025-004',
      mitra: 'Universitas Teknologi Indonesia',
      status: 'Ditandatangani',
      statusColor: '#10b981', // green
      createdAt: '05 Jun 2023',
      expiredAt: '05 Jun 2025',
      integritas: 'Terverifikasi',
    },
    {
      title: 'Perjanjian Sewa Gedung',
      ref: 'CNTR-2025-005',
      mitra: 'PT Properti Sejahtera',
      status: 'Draft',
      statusColor: '#6b7280', // gray
      createdAt: '01 Agu 2023',
      expiredAt: '-',
      integritas: 'Belum ada',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const contractsColumnDef: any[] = useMemo(
    () => [
      {
        headerName: 'Judul Kontrak',
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
      { headerName: 'Mitra', field: 'mitra', flex: 2 },
      {
        headerName: 'Status',
        field: 'status',
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
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
      { headerName: 'Tanggal Buat', field: 'createdAt', flex: 1 },
      { headerName: 'Tanggal Jatuh Tempo', field: 'expiredAt', flex: 1 },
      { headerName: 'Integritas', field: 'integritas', flex: 1 },
    ],
    [],
  );

  return {
    statisticsHeader,
    lineData,
    pieData,
    contractsData,
    contractsColumnDef,
  };
};

const ContractManagementContext = createContext<
  ReturnType<typeof useContractManagementHooks> | undefined
>(undefined);

export const ContractManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useContractManagementHooks();
  return (
    <ContractManagementContext.Provider value={value}>
      {children}
    </ContractManagementContext.Provider>
  );
};

export const useContractManagement = () => {
  const context = useContext(ContractManagementContext);
  if (context === undefined) {
    throw new Error('ContractManagementContext must be used within an ContractManagementProvider');
  }
  return context;
};
export default useContractManagement;
