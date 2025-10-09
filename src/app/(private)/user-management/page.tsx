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
import TablePagination from '@/components/molecules/pagination';
import useProfileProvider from '@/context/profileProvider/hooks';
import UserListSkeleton from './components/userListSkeleton';

export default function UserManagementPage() {
  const {
    activeTab,
    usersData,
    usersColumnsDef,
    openModalUser,
    setOpenModalUser,
    setMode,
    setSearch,
    search,
    setSelectedUserId,
    globalLoading,
    setPage,
    setFilter,
    filter,
    setLimit,
  } = useUserManagement();

  const { isLoadingDataProfile } = useProfileProvider();

  return (
    <>
      <div className="w-full flex flex-col gap-4">
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
          <>
            <div className="flex flex-col gap-6 bg-white p-4 rounded-md shadow-sm">
              <div className="w-full flex justify-center items-center overflow-x-auto overflow-y-hidden max-w-full">
                <div className="w-full flex gap-2">
                  <CAutoComplete
                    options={[
                      { label: 'User', value: 'User' },
                      { label: 'Admin', value: 'Admin' },
                      { label: 'Partner', value: 'Partner' },
                      { label: 'Verificator', value: 'Verificator' },
                      { label: 'Signer', value: 'Signer' },
                    ]}
                    className="w-1/3"
                    getOptionKey={option => String(option.value)}
                    renderOption={(props, option) => (
                      <li {...props} key={String(option.value)}>
                        {option.label}
                      </li>
                    )}
                    onChange={(_, role) => {
                      setFilter({ ...filter, role: role?.value ?? '' });
                    }}
                    getOptionLabel={option => option.label}
                    placeholder="Filter Role"
                  />
                  <CAutoComplete
                    options={[
                      { label: 'Aktif', value: 'active' },
                      { label: 'Tidak Aktif', value: 'inactive' },
                    ]}
                    className="w-1/3"
                    getOptionKey={option => String(option.value)}
                    renderOption={(props, option) => (
                      <li {...props} key={String(option.value)}>
                        {option.label}
                      </li>
                    )}
                    onChange={(_, status) => {
                      setFilter({ ...filter, status: status?.value ?? '' });
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
            </div>

            {isLoadingDataProfile ? (
              <UserListSkeleton />
            ) : (
              <div className="w-full overflow-y-scroll bg-white rounded-md shadow mb-4">
                <DataGrid
                  rowData={usersData?.data ?? []}
                  columnDefs={usersColumnsDef}
                  pagination={false}
                  loading={globalLoading}
                />
                <TablePagination
                  meta={usersData?.meta}
                  onPageChange={setPage}
                  onLimitChange={newLimit => {
                    setLimit(newLimit);
                    setPage(1);
                  }}
                />
              </div>
            )}
          </>
        )}
        {openModalUser && <UserModal />}
      </div>
    </>
  );
}
