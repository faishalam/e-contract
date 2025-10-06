'use client';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CAutoComplete from '@/components/atoms/auto-complete';
// import DataGrid from '@/components/molecules/datagrid';
import useEsign from './hooks';
import QuotaCard from './components/quotaCard';
import UsageStatistics from './components/usageStatistic';
import RecentUsageLogs from './components/recentUsageLogs';
import PurchaseQuota from './components/purchaseQuota';

export default function EsignManagementPage() {
  const {
    quotasData,
    // usageHistoryColumnDef, usageHistoryData
  } = useEsign();

  return (
    <div className="w-full flex flex-col gap-6 pb-6">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="text-black flex flex-col">
          <p className="text-2xl font-bold">e-Sign & e-Stamp Quota Management</p>
          <p className="text-sm text-gray-700">
            Monitor and manage your electronic signing and stamping quotas
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="!bg-orange-500 !capitalize !shadow-sm whitespace-nowrap"
        >
          Purchase Additional Quotas
        </Button>
      </div>

      {/* Quota Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quotasData.map((item, index) => (
          <QuotaCard key={index} {...item} />
        ))}
      </div>

      {/* Statistics & Logs */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <UsageStatistics />
        </div>
        <div className="lg:col-span-1">
          <RecentUsageLogs />
        </div>
      </div>

      {/* Usage History Table */}
      <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row p-4 gap-3 justify-between items-start md:items-center border-b">
          <div>
            <h2 className="font-bold text-lg text-black">Usage History</h2>
          </div>
          <div className="w-full md:w-auto flex gap-2 flex-wrap md:flex-nowrap">
            <CAutoComplete
              options={[]}
              className="w-full md:w-[160px]"
              getOptionKey={option => option.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              getOptionLabel={option => option.label}
              placeholder="All Type"
            />
            <CAutoComplete
              options={[]}
              className="w-full md:w-[160px]"
              getOptionKey={option => option.value}
              renderOption={(props, option) => (
                <li {...props} key={option.value}>
                  {option.label}
                </li>
              )}
              getOptionLabel={option => option.label}
              placeholder="All Status"
            />
            <Button
              variant="contained"
              className="!bg-gray-200 !text-black !capitalize !shadow-sm w-full md:w-auto"
            >
              Export
            </Button>
          </div>
        </div>
        <div className="w-full max-h-[500px] overflow-auto">
          {/* <DataGrid columnDefs={usageHistoryColumnDef} rowData={usageHistoryData} /> */}
        </div>
      </div>

      {/* Purchase Quota Section */}
      <div className="w-full bg-white rounded-lg shadow-sm p-6">
        <PurchaseQuota />
      </div>
    </div>
  );
}
