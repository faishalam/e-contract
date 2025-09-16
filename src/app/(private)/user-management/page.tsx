'use client';
import { Button, Switch } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StatsCard from './components/statsCard';
import CInput from '@/components/atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import CAutoComplete from '@/components/atoms/auto-complete';
import ActivityTabs from './components/activeTabsFilter';
import useUserManagement from './hooks';
import DataGrid from '@/components/molecules/datagrid';

export default function UserManagementPage() {
  const { dataGrid, activitesColumnsDef, activeTab } = useUserManagement();
  return (
    <>
      <div className="w-[100%] h-screen flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-black flex flex-col w-full">
            <p className="text-2xl font-bold">Activity Logs</p>
            <p className="text-sm text-gray-700">
              Track all user actions across the e-Contract platform.
            </p>
          </div>
          <div className="w-full flex justify-end gap-3">
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              className="!text-black !bg-gray-200 !capitalize !shadow-sm"
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              className="!bg-orange-500 !capitalize !shadow-sm"
            >
              Filters
            </Button>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-md shadow p-4 w-full">
          <StatsCard />
        </div>

        <div className="flex flex-col gap-6 bg-white p-4 rouonded-md shadow-sm">
          <ActivityTabs />
        </div>

        <div className="flex flex-col gap-6 bg-white p-4 rouonded-md shadow-sm">
          <div className="w-full flex justify-center items-center">
            <div className="w-full flex gap-2">
              <CAutoComplete
                options={[]}
                className="w-1/3"
                getOptionKey={option => option.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                // onChange={(_, status) => {
                // setFilter({ ...filter, status });
                // }}
                getOptionLabel={option => option.label}
                placeholder="All Users"
              />
              <CAutoComplete
                options={[]}
                className="w-1/3"
                getOptionKey={option => option.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                // onChange={(_, status) => {
                // setFilter({ ...filter, status });
                // }}
                getOptionLabel={option => option.label}
                placeholder="All Actions"
              />
              <CAutoComplete
                options={[]}
                className="w-1/3"
                getOptionKey={option => option.value}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                // onChange={(_, status) => {
                // setFilter({ ...filter, status });
                // }}
                getOptionLabel={option => option.label}
                placeholder="Last 30 Days"
              />
            </div>
            <div className="flex w-full gap-2 justify-end">
              <CInput
                className="w-1/2"
                type="text"
                placeholder="Search Logs"
                icon={<SearchIcon className="text-black" />}
                // onChange={e => setSearch(e.target.value)}
                // value={search}
              />
              <div className="flex justify-center items-center text-black text-xs">
                <span>Auto Refresh</span>
                <Switch disabled defaultChecked />
                <span>Off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full overflow-y-scroll h-full">
          {activeTab === 'All Activities' && (
            <DataGrid rowData={dataGrid} columnDefs={activitesColumnsDef} />
          )}
        </div>
      </div>
    </>
  );
}
