'use client';
import DataGrid from '@/components/molecules/datagrid';
import CardHeader from './components/cardHeader';
import PlatformActivityChart from './components/platformActivityChart';
import RecentActivity from './components/recentActivity';
import useDashboard from './hooks';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import { Button, LinearProgress } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import RecentPartners from './components/recentPartners';
import QuickAccess from './components/quickAccess';

export default function DashboardPage() {
  const { statisticsHeader, activeContractsColumnDef, dataGrid } = useDashboard();

  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col gap-6">
        <div className="text-black flex flex-col">
          <p className="text-2xl font-bold">Welcome Back, Anisa!</p>
          <p className="text-sm text-gray-700">{`Here's what's happening with your contract today.`}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsHeader.map((stat, idx) => (
            <CardHeader key={idx} {...stat} />
          ))}
        </div>

        <div className="h-full grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 items-stretch">
          <div className="col-span-2 h-full">
            <PlatformActivityChart />
          </div>
          <div className="h-full">
            <RecentActivity />
          </div>
        </div>

        <div className="w-full flex flex-col bg-white rounded-md shadow-sm">
          <div className="flex p-4 max-w-full gap-3 w-full justify-between">
            <div>
              <h2 className="font-bold text-lg text-black">Active Contracts</h2>
            </div>
            <div className="w-full md:w-1/3 justify-center items-center flex gap-2 overflow-x-auto">
              <CAutoComplete
                options={[]}
                className="w-full"
                getOptionKey={option => option.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                onChange={(_, status) => {
                  // setFilter({ ...filter, status });
                }}
                getOptionLabel={option => option.label}
                placeholder="Status"
              />
              <CAutoComplete
                options={[]}
                className="w-full"
                getOptionKey={option => option.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                onChange={(_, status) => {
                  // setFilter({ ...filter, status });
                }}
                getOptionLabel={option => option.label}
                placeholder="Status"
              />
              <Button
                variant="contained"
                fullWidth
                className="!bg-orange-500 !capitalize !shadow-sm"
              >
                New Contract
              </Button>
            </div>
          </div>
          <div className="w-full overflow-y-scroll">
            <DataGrid columnDefs={activeContractsColumnDef} rowData={dataGrid} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <RecentPartners />
        </div>

        <div className="w-full">
          <QuickAccess />
        </div>
      </div>
    </>
  );
}
