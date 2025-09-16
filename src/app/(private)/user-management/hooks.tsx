'use client';
import { Avatar } from '@mui/material';
import { createContext, useContext, useMemo, useState } from 'react';

const useUserManagementHooks = () => {
  const [activeTab, setActiveTab] = useState<string>('All Activities');
  const activities = [
    { value: '1,247', label: 'Total Activities', color: 'text-black' },
    { value: '328', label: 'Contract Activities', color: 'text-orange-500' },
    { value: '156', label: 'User Activities', color: 'text-blue-500' },
    { value: '89', label: 'Signing Activities', color: 'text-green-500' },
    { value: '45', label: "Today's Activities", color: 'text-purple-500' },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activitesColumnsDef: any[] = useMemo(
    () => [
      {
        field: 'user',
        headerName: 'User / System',
        width: 250,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <div className="flex items-center gap-3 w-full">
            <Avatar
              src={params.data.avatar}
              alt={params.data.user}
              sx={{ width: 32, height: 32 }}
            />
            <div className="flex flex-col w-full h-full">
              <span className="font-medium">{params.data.user}</span>
            </div>
          </div>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cellRenderer: (params: any) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
        ${
          params.data.actionColor === 'green'
            ? 'bg-green-100 text-green-700'
            : params.data.actionColor === 'orange'
              ? 'bg-orange-100 text-orange-700'
              : params.data.actionColor === 'blue'
                ? 'bg-blue-100 text-blue-700'
                : params.data.actionColor === 'purple'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-700'
        }`}
          >
            {params.data.action}
          </span>
        ),
      },
      { field: 'details', headerName: 'Details', flex: 2 },
      { field: 'ip', headerName: 'IP Address', flex: 1 },
      { field: 'timestamp', headerName: 'Timestamp', flex: 1 },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        cellRenderer: () => <button className="text-gray-400 hover:text-gray-600">⋮</button>,
      },
    ],
    [],
  );

  const dataGrid = [
    {
      id: 1,
      user: 'Anisa Wijaya',
      role: 'Admin Corporate',
      avatar: 'https://i.pravatar.cc/100?img=1',
      action: 'Contract Signed',
      actionColor: 'green',
      details: 'Signed "Logistics Service Agreement" (LSA-2023-0045)',
      ip: '192.168.1.45',
      timestamp: 'Today at 10:45 AM',
    },
    {
      id: 2,
      user: 'Budi Santoso',
      role: 'Partner User',
      avatar: 'https://i.pravatar.cc/100?img=2',
      action: 'Contract Signed',
      actionColor: 'green',
      details: 'Signed "IT Service Agreement" (ITSA-2023-0078)',
      ip: '203.142.21.78',
      timestamp: 'Today at 09:30 AM',
    },
    {
      id: 3,
      user: 'System',
      role: 'Automated Process',
      avatar: '',
      action: 'Notification Sent',
      actionColor: 'orange',
      details: 'Expiry reminder for "Vendor Agreement" (VA-2022-0098)',
      ip: 'Internal',
      timestamp: 'Yesterday at 11:30 AM',
    },
    {
      id: 4,
      user: 'Dian Permata',
      role: 'Legal Reviewer',
      avatar: 'https://i.pravatar.cc/100?img=4',
      action: 'Contract Reviewed',
      actionColor: 'blue',
      details: 'Reviewed "Marketing Partnership" (MKT-2023-0032)',
      ip: '192.168.1.78',
      timestamp: 'Yesterday at 16:20 PM',
    },
    {
      id: 5,
      user: 'Siti Rahma',
      role: 'Corporate User',
      avatar: 'https://i.pravatar.cc/100?img=5',
      action: 'User Login',
      actionColor: 'orange',
      details: 'Successful login (Windows 10)',
      ip: '192.168.1.102',
      timestamp: 'Jun 29, 2023 at 08:45 AM',
    },
  ];

  return {
    activitesColumnsDef,
    activities,
    activeTab,
    setActiveTab,
    dataGrid,
  };
};

const UserManagementContext = createContext<ReturnType<typeof useUserManagementHooks> | undefined>(
  undefined,
);

export const UserManagementProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useUserManagementHooks();
  return <UserManagementContext.Provider value={value}>{children}</UserManagementContext.Provider>;
};

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('UserManagementContext must be used within an UserManagementProvider');
  }
  return context;
};
export default useUserManagement;
