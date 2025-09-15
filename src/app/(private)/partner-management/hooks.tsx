'use client';

import { createContext, useContext, useMemo } from 'react';

const usePartnerManagementHooks = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const partnerColumnDef: any[] = useMemo(
    () => [
      {
        headerName: 'Name',
        field: 'name',
        flex: 2,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <div>
            <div className="font-semibold">{params.data.name}</div>
            <div className="text-xs text-gray-500">REF: {params.data.ref}</div>
          </div>
        ),
      },
      { headerName: 'Type', field: 'type', flex: 2 },
      { headerName: 'Contact', field: 'contact', flex: 1 },
      { headerName: 'Legal Document', field: 'legalDocument', flex: 1 },
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
      { headerName: 'Active Contract', field: 'activeContract', flex: 1 },
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

  const partnersData = [
    {
      name: 'PT Sinar Logistik',
      ref: 'REF001',
      type: 'Corporate',
      contact: 'logistics@sinarlogistik.co.id',
      legalDocument: 'SIUP-2023-001',
      status: 'Active',
      statusColor: '#16a34a', // hijau
      activeContract: 3,
      expiry: '2025-12-31',
    },
    {
      name: 'PT Teknologi Maju',
      ref: 'REF002',
      type: 'Corporate',
      contact: 'contact@teknologimaju.com',
      legalDocument: 'SIUP-2022-014',
      status: 'Inactive',
      statusColor: '#9ca3af', // abu-abu
      activeContract: 0,
      expiry: '2024-05-15',
    },
    {
      name: 'PT Media Kreatif',
      ref: 'REF003',
      type: 'Corporate',
      contact: 'info@mediakreatif.id',
      legalDocument: 'SIUP-2023-010',
      status: 'Active',
      statusColor: '#16a34a', // hijau
      activeContract: 2,
      expiry: '2026-03-20',
    },
    {
      name: 'CV Logistik Cepat',
      ref: 'REF004',
      type: 'Small Business',
      contact: 'admin@logistikcepat.co.id',
      legalDocument: 'NIB-2021-078',
      status: 'Pending',
      statusColor: '#f59e0b', // oranye
      activeContract: 1,
      expiry: '2025-07-01',
    },
    {
      name: 'PT Konsultan Digital',
      ref: 'REF005',
      type: 'Corporate',
      contact: 'cs@konsultandigital.com',
      legalDocument: 'SIUP-2020-021',
      status: 'Expired',
      statusColor: '#dc2626', // merah
      activeContract: 0,
      expiry: '2023-10-10',
    },
  ];
  return {
    partnerColumnDef,
    partnersData,
  };
};

const PartnerManagementContext = createContext<
  ReturnType<typeof usePartnerManagementHooks> | undefined
>(undefined);

export const PartnerManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = usePartnerManagementHooks();
  return (
    <PartnerManagementContext.Provider value={value}>{children}</PartnerManagementContext.Provider>
  );
};

export const usePartnerManagement = () => {
  const context = useContext(PartnerManagementContext);
  if (context === undefined) {
    throw new Error('PartnerManagementContext must be used within an PartnerManagementProvider');
  }
  return context;
};
export default usePartnerManagement;
