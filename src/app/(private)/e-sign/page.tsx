'use client';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import { useMemo } from 'react';
import DataGrid from '@/components/molecules/datagrid';
import useEsign from './hooks';
import QuotaCard from './components/quotaCard';
import UsageStatistics from './components/usageStatistic';
import RecentUsageLogs from './components/recentUsageLogs';
import PurchaseQuota from './components/purchaseQuota';

export default function EsignManagementPage() {
  const { quotasData, usageHistoryColumnDef, usageHistoryData } = useEsign();
  return (
    <>
      <div className="w-[100%] h-[100%] flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-black flex flex-col w-full">
            <p className="text-2xl font-bold">e-Sign & e-Stamp Quota Management</p>
            <p className="text-sm text-gray-700">
              Monitor and manage your electronic signing and stamping quotas
            </p>
          </div>
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="!bg-orange-500 !capitalize !shadow-sm"
            >
              Purchase Additional Quotas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quotasData.map((item, index) => (
            <QuotaCard key={index} {...item} />
          ))}
        </div>

        <div className="h-full grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 items-stretch">
          <div className="col-span-2 h-full">
            <UsageStatistics />
          </div>
          <div className="">
            <RecentUsageLogs />
          </div>
        </div>

        <div className="w-full h-full bg-white rounded-md shadow">
          <div className="flex p-4 max-w-full gap-3 w-full justify-between">
            <div>
              <h2 className="font-bold text-lg text-black">Usage History</h2>
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
                placeholder="All Type"
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
                placeholder="All Status"
              />
              <Button
                variant="contained"
                fullWidth
                className="!bg-gray-200 !text-black !capitalize !shadow-sm"
              >
                Export
              </Button>
            </div>
          </div>
          <div className="w-full overflow-y-scroll">
            <DataGrid columnDefs={usageHistoryColumnDef} rowData={usageHistoryData} />
          </div>
        </div>
        <div className="w-full bg-white rounded-md shadow p-4">
          <PurchaseQuota />
        </div>
      </div>
    </>
  );
}
