'use client';
import WarningIcon from '@mui/icons-material/Warning';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckIcon from '@mui/icons-material/Check';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { createContext, useContext } from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NatureIcon from '@mui/icons-material/Nature';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { ColDef } from '@ag-grid-community/core';

const useMerchantManagementHooks = () => {
  const statisticsHeader = [
    {
      title: 'Total Merchant',
      icon: <StorefrontIcon className="text-orange-500" />,
      value: 247,
      conclusion: '↑ 18 merchant baru',
      trend: 'up' as const,
    },
    {
      title: 'Merchant Active',
      icon: <CheckIcon className="text-blue-500" />,
      value: 189,
      conclusion: '76.5% dari total merchant',
      trend: 'neutral' as const,
    },
    {
      title: 'Pending Verifikasi',
      icon: <WatchLaterIcon className="text-green-500" />,
      value: 31,
      conclusion: 'Perlu review',
      trend: 'down' as const,
    },
    {
      title: 'Trial Berakhir',
      icon: <WarningIcon className="text-purple-500" />,
      value: 234,
      conclusion: 'Dalam 7 Hari',
      trend: 'neutral' as const,
    },
    {
      title: 'Revenue Bulanan',
      icon: <AttachMoneyIcon className="text-purple-500" />,
      value: 24.8,
      conclusion: '↑ 22% MoM',
      trend: 'neutral' as const,
    },
  ];

  const merchantData = [
    {
      merchant: {
        name: 'PT. Teknologi Maju',
        email: 'teknologi@maju.com',
        icon: 'tech',
        iconBg: '#DBEAFE',
        iconColor: '#3B82F6',
      },
      industry: {
        main: 'Teknologi',
        sub: 'Software Development',
      },
      status: {
        label: 'Aktif',
        color: 'success',
      },
      package: {
        name: 'Professional',
        price: '$99/bulan',
      },
      users: 25,
      contracts: 142,
      joined: '15 Jan',
    },
    {
      merchant: {
        name: 'CV. Solusi Hijau',
        email: 'info@solusihijau.id',
        icon: 'nature',
        iconBg: '#D1FAE5',
        iconColor: '#10B981',
      },
      industry: {
        main: 'Lingkungan',
        sub: 'Waste Management',
      },
      status: {
        label: 'Pending',
        color: 'warning',
      },
      package: {
        name: 'Basic',
        price: '$29/bulan',
      },
      users: 8,
      contracts: 23,
      joined: '22 Jul',
    },
    {
      merchant: {
        name: 'PT. Finansial Nusantara',
        email: 'contact@finnusa.co.id',
        icon: 'finance',
        iconBg: '#E9D5FF',
        iconColor: '#8B5CF6',
      },
      industry: {
        main: 'Keuangan',
        sub: 'Financial Services',
      },
      status: {
        label: 'Aktif',
        color: 'success',
      },
      package: {
        name: 'Enterprise',
        price: '$299/bulan',
      },
      users: 85,
      contracts: 567,
      joined: '03 Mar',
    },
    {
      merchant: {
        name: 'Toko Retail Modern',
        email: 'admin@retailmodern.com',
        icon: 'retail',
        iconBg: '#FEE2E2',
        iconColor: '#EF4444',
      },
      industry: {
        main: 'Retail',
        sub: 'E-commerce',
      },
      status: {
        label: 'Trial Berakhir',
        color: 'error',
      },
      package: {
        name: 'Trial',
        price: 'Gratis',
      },
      users: 3,
      contracts: 7,
      joined: '28 Jul',
    },
  ];

  // Icon component renderer
  const getIconComponent = (iconType: string, color: string) => {
    const iconProps = { style: { fontSize: '20px', color } };

    switch (iconType) {
      case 'tech':
        return <StorefrontIcon {...iconProps} />;
      case 'nature':
        return <NatureIcon {...iconProps} />;
      case 'finance':
        return <TrendingUpIcon {...iconProps} />;
      case 'retail':
        return <ShoppingBagIcon {...iconProps} />;
      default:
        return <StorefrontIcon {...iconProps} />;
    }
  };

  // Status color mapping
  const getStatusStyle = (color: string) => {
    const styles = {
      success: {
        backgroundColor: '#D1FAE5',
        color: '#065F46',
      },
      warning: {
        backgroundColor: '#FEF3C7',
        color: '#92400E',
      },
      error: {
        backgroundColor: '#FEE2E2',
        color: '#991B1B',
      },
    };
    return styles[color as keyof typeof styles] || styles.success;
  };

  // Column definitions with proper typing
  const merchantColumnsDef: ColDef[] = [
    {
      headerName: '',
      field: 'checkbox',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left' as const,
    },
    {
      headerName: 'Merchant',
      field: 'merchant',
      flex: 2.5,
      minWidth: 280,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        const { name, email, icon, iconBg, iconColor } = params.data.merchant;
        return (
          <div className="flex items-center gap-3 py-2">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: iconBg,
                flexShrink: 0,
              }}
            >
              {getIconComponent(icon, iconColor)}
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-gray-900 text-sm">{name}</div>
              <div className="text-xs text-gray-500">{email}</div>
            </div>
          </div>
        );
      },
    },
    {
      headerName: 'Industri',
      field: 'industry',
      flex: 2,
      minWidth: 200,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        const { main, sub } = params.data.industry;
        return (
          <div className="flex flex-col py-2">
            <div className="text-sm text-gray-900">{main}</div>
            <div className="text-xs text-gray-500">{sub}</div>
          </div>
        );
      },
    },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1.5,
      minWidth: 150,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        const { label, color } = params.data.status;
        const style = getStatusStyle(color);
        return (
          <div className="py-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: style.backgroundColor,
                color: style.color,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mr-2"
                style={{ backgroundColor: style.color }}
              />
              {label}
            </span>
          </div>
        );
      },
    },
    {
      headerName: 'Paket',
      field: 'package',
      flex: 1.5,
      minWidth: 150,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        const { name, price } = params.data.package;
        return (
          <div className="flex flex-col py-2">
            <div className="text-sm text-gray-900 font-medium">{name}</div>
            <div className="text-xs text-gray-500">{price}</div>
          </div>
        );
      },
    },
    {
      headerName: 'Pengguna',
      field: 'users',
      flex: 1,
      minWidth: 100,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => <div className="text-sm text-gray-900">{params.value}</div>,
    },
    {
      headerName: 'Kontrak',
      field: 'contracts',
      flex: 1,
      minWidth: 100,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => <div className="text-sm text-gray-900">{params.value}</div>,
    },
    {
      headerName: 'Bergabung',
      field: 'joined',
      flex: 1,
      minWidth: 120,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => <div className="text-sm text-gray-900">{params.value}</div>,
    },
  ];

  return {
    statisticsHeader,
    merchantData,
    merchantColumnsDef,
  };
};

const MerchantManagementContext = createContext<
  ReturnType<typeof useMerchantManagementHooks> | undefined
>(undefined);

export const MerchantManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useMerchantManagementHooks();
  return (
    <MerchantManagementContext.Provider value={value}>
      {children}
    </MerchantManagementContext.Provider>
  );
};

export const useMerchantManagement = () => {
  const context = useContext(MerchantManagementContext);
  if (context === undefined) {
    throw new Error('MerchantManagementContext must be used within an MerchantManagementProvider');
  }
  return context;
};
export default useMerchantManagement;
