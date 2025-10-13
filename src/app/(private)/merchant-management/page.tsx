'use client';
import useMerchantManagement from './hooks';
import SearchIcon from '@mui/icons-material/Search';
import CardHeader from './components/cardHeader';
import DataGrid from '@/components/molecules/datagrid';
import ButtonHeader from './components/buttonHeader';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import TablePagination from '@/components/molecules/pagination';
import MerchantListSkeleton from './components/merchantListSkeleton';
import useProfileGlobal from '@/context/profileProvider/hooks';

export default function MarchantManaagementPage() {
  const {
    statisticsHeader,
    merchantColumnsDef,
    dataMerchantList,
    loadingMerchant,
    setFilter,
    filter,
    setSearch,
    search,
    setPage,
    setLimit,
  } = useMerchantManagement();
  const { isLoadingDataProfile } = useProfileGlobal();
  return (
    <>
      <div className="w-full flex flex-col gap-6">
        {/* button header */}
        <div className="w-full flex justify-between items-center gap-80">
          <ButtonHeader />
        </div>

        {/* Card Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statisticsHeader.map((stat, idx) => (
            <CardHeader key={idx} {...stat} />
          ))}
        </div>

        {/* Grafik */}
        {/* <div className="w-full flex gap-4">
          <MerchantCharts />
        </div> */}

        {/* table */}
        {isLoadingDataProfile ? (
          <MerchantListSkeleton />
        ) : (
          <div className="bg-white w-full p-4 rounded-md shadow-sm">
            <h2 className="font-semibold text-lg text-black mb-4">Merchant List</h2>
            <div className="flex justify-between items-center gap-4 w-full mb-4">
              <CInput
                className="w-1/3"
                type="text"
                placeholder="Search merchant"
                icon={<SearchIcon className="text-black" />}
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
              <CAutoComplete
                options={[
                  { label: 'Aktif', value: 'active' },
                  { label: 'Tidak Aktif', value: 'inactive' },
                  { label: 'Pending', value: 'pending' },
                ]}
                className="w-1/5"
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
            <div className="w-full overflow-y-scroll">
              <DataGrid
                columnDefs={merchantColumnsDef}
                rowData={dataMerchantList?.data}
                rowSelection="multiple"
                loading={loadingMerchant}
                pagination={false}
              />
              <TablePagination
                meta={dataMerchantList?.meta}
                onPageChange={setPage}
                onLimitChange={newLimit => {
                  setLimit(newLimit);
                  setPage(1);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
