'use client';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StatsCard from './components/statsCard';
import CInput from '@/components/atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import CAutoComplete from '@/components/atoms/auto-complete';
import ActivityTabs from './components/activeTabsFilter';
import useUserManagement from './hooks';
import DataGrid from '@/components/molecules/datagrid';
import UserModal from './components/userModal';

export default function UserManagementPage() {
  const {
    activeTab,
    usersData,
    usersColumnsDef,
    openModalUser,
    setOpenModalUser,
    setMode,
    limit,
    setPage,
    setSearch,
    search,
    setActive,
    setSelectedUserId,
    globalLoading,
  } = useUserManagement();
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
          <div className="w-full flex justify-end gap-2">
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              className="!text-black !bg-gray-200 !capitalize !shadow-sm !rounded-md"
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              className="!bg-orange-500 !capitalize !shadow-sm !rounded-md"
            >
              Filters
            </Button>
          </div>
        </div>
        <div className="flex max-w-full overflow-x-auto items-center bg-white rounded-md shadow-sm p-4 w-full">
          <StatsCard />
        </div>

        <div className="flex flex-col max-w-full gap-6 bg-white p-4 rounded-md shadow-sm">
          <ActivityTabs />
        </div>

        {activeTab === 'All Users' && (
          <div className="flex flex-col gap-6 bg-white p-4 rounded-md shadow-sm">
            <div className="w-full flex justify-center items-center overflow-x-auto overflow-y-hidden max-w-full">
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
                  options={[
                    { label: 'Aktif', value: true },
                    { label: 'Tidak Aktif', value: false },
                  ]}
                  className="w-1/3"
                  getOptionKey={option => String(option.value)}
                  renderOption={(props, option) => (
                    <li {...props} key={String(option.value)}>
                      {option.label}
                    </li>
                  )}
                  onChange={(_, status) => {
                    setActive(status?.value);
                  }}
                  getOptionLabel={option => option.label}
                  placeholder="Filter Status"
                />
              </div>
              <div className="flex w-full gap-2 justify-end">
                <CInput
                  className="w-1/2"
                  type="text"
                  placeholder="Search Logs"
                  icon={<SearchIcon className="text-black" />}
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                />
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  className="!rounded-md"
                  onClick={() => {
                    setSelectedUserId(null);
                    setOpenModalUser(true);
                    setMode('create');
                  }}
                >
                  Create User
                </Button>
              </div>
            </div>
            <div className="w-full h-[57vh] overflow-y-scroll rounded-md">
              <DataGrid
                rowData={usersData?.users ?? []}
                columnDefs={usersColumnsDef}
                pagination={true}
                loading={globalLoading}
                paginationPageSize={limit}
                paginationPageSizeSelector={[10, 20, 50]}
                onPaginationChanged={params => {
                  if (params.api) {
                    const newPage = params.api.paginationGetCurrentPage() + 1;
                    setPage(newPage);
                  }
                }}
              />
            </div>
          </div>
        )}

        {openModalUser && <UserModal />}
      </div>
    </>
  );
}
