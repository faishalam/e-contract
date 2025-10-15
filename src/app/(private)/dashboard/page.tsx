'use client';
import DataGrid from '@/components/molecules/datagrid';
import CardHeader from './components/cardHeader';
import PlatformActivityChart from './components/platformActivityChart';
import RecentActivity from './components/recentActivity';
import useDashboard from './hooks';
import CAutoComplete from '@/components/atoms/auto-complete';
import { Button } from '@mui/material';
import RecentPartners from './components/recentPartners';
import QuickAccess from './components/quickAccess';

export default function DashboardPage() {
  const { statisticsHeader, activeContractsColumnDef, dataGrid } = useDashboard();

  return (
    <div className="w-full flex flex-col gap-6 pb-6">
      <div className="text-black flex flex-col gap-1">
        <p className="text-2xl font-bold">Welcome Back, Anis</p>
        <p className="text-sm text-gray-700">{`Here's what's happening with your contract today.`}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticsHeader.map((stat, idx) => (
          <CardHeader key={idx} {...stat} />
        ))}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PlatformActivityChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="w-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row p-4 gap-3 justify-between items-start md:items-center border-b">
          <div>
            <h2 className="font-bold text-lg text-black">Active Contracts</h2>
          </div>
          <div className="w-full md:w-auto flex gap-2 flex-wrap md:flex-nowrap">
            <CAutoComplete
              options={[]}
              className="w-full md:w-[180px]"
              getOptionKey={option => option.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              getOptionLabel={option => option.label}
              placeholder="Status"
            />
            <CAutoComplete
              options={[]}
              className="w-full md:w-[180px]"
              getOptionKey={option => option.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              getOptionLabel={option => option.label}
              placeholder="Category"
            />
            <Button
              variant="contained"
              color="primary"
              className="w-full md:w-auto whitespace-nowrap"
            >
              New Contract
            </Button>
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <DataGrid columnDefs={activeContractsColumnDef} rowData={dataGrid} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentPartners />
      </div>
      <div className="bg-white rounded-md shadow-sm p-4">
        <QuickAccess />
      </div>
    </div>
  );
}
