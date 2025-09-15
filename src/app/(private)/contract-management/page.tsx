'use client';
import { Button } from '@mui/material';
import CardHeader from './components/cardHeader';
import ContractCharts from './components/contractChart';
import useContractManagement from './hooks';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import DataGrid from '@/components/molecules/datagrid';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useRouter } from 'next/navigation';

export default function ContractManagement() {
  const { statisticsHeader, contractsColumnDef, contractsData } = useContractManagement();
  const router = useRouter();
  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsHeader.map((stat, idx) => (
            <CardHeader key={idx} {...stat} index={idx} />
          ))}
        </div>

        <div className="w-full h-full">
          <ContractCharts />
        </div>

        <div className="w-full h-full">
          <div className="w-full h-full bg-white p-4 flex flex-col gap-4 rounded-md shadow-sm">
            {/* buttons */}
            <div className="w-full md:w-1/3 justify-center items-center flex gap-2 overflow-x-auto text-black">
              <Button
                variant="contained"
                fullWidth
                startIcon={<AddIcon />}
                className="!bg-orange-500 !capitalize !shadow-sm"
                onClick={() => router.push('/contract-management/create?step=metadata')}
              >
                Contract
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<UploadIcon />}
                className="!bg-white !capitalize !shadow-md !text-black !border !border-gray-300"
              >
                Import
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<DownloadIcon />}
                className="!bg-white !capitalize !shadow-md !text-black !border !border-gray-300"
              >
                Export
              </Button>

              <Button
                variant="contained"
                fullWidth
                startIcon={<AnalyticsIcon />}
                className="!bg-white !capitalize !shadow-md !text-black !border !border-gray-300"
              >
                Analytics
              </Button>
            </div>
            {/* filter */}
            <div className="w-full flex gap-2 justify-center items-center">
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
              <CInput
                type="date"
                className="w-full"
                placeholder="Cutoff from"
                // onChange={e => setFilter({ ...filter, cutoff_from: e.target.value })}
                // value={filter.cutoff_from}
              />
              <CInput
                type="date"
                className="w-full"
                placeholder="Cutoff from"
                // onChange={e => setFilter({ ...filter, cutoff_from: e.target.value })}
                // value={filter.cutoff_from}
              />
              <CInput
                className="w-full"
                type="text"
                placeholder="Search"
                icon={<SearchIcon className="text-black" />}
                // onChange={e => setSearch(e.target.value)}
                // value={search}
              />
            </div>

            {/* table */}
            <div className="w-full overflow-y-scroll">
              <DataGrid columnDefs={contractsColumnDef} rowData={contractsData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
