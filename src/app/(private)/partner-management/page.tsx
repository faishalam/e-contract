'use client';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CAutoComplete from '@/components/atoms/auto-complete';
import CInput from '@/components/atoms/input';
import SearchIcon from '@mui/icons-material/Search';
import DataGrid from '@/components/molecules/datagrid';
import usePartnerManagement from './hooks';
import ModalPartner from './components/modal';

export default function PartnerManagementPage() {
  const { partnerColumnDef, partnersData, openModal, setOpenModal } = usePartnerManagement();

  return (
    <>
      <div className="w-full h-screen flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-black flex flex-col w-full">
            <p className="text-2xl font-bold">Partner Management</p>
            <p className="text-sm text-gray-700">Manage your corporate and individual partners</p>
          </div>
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="!bg-orange-500 !capitalize !shadow-sm w-40"
              onClick={() => setOpenModal(!openModal)}
            >
              Add Partner
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4 bg-white rouonded-md shadow-sm">
          <div className="w-full flex justify-center overflow-auto max-w-full">
            <div className="w-full flex gap-2">
              <Button variant="contained" className="!bg-orange-500 !capitalize !shadow-sm w-40">
                Corporate
              </Button>
              <Button
                variant="contained"
                className="!bg-gray-200 !text-black !capitalize !shadow-sm w-40"
              >
                Individual
              </Button>
            </div>
            <div className="flex w-full gap-2">
              <CInput
                className="w-full"
                type="text"
                placeholder="Search"
                icon={<SearchIcon className="text-black" />}
                // onChange={e => setSearch(e.target.value)}
                // value={search}
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
                placeholder="Status"
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
                placeholder="Sort By"
              />
            </div>
          </div>

          <div className="w-full overflow-y-scroll">
            <DataGrid columnDefs={partnerColumnDef} rowData={partnersData} />
          </div>
        </div>
        <ModalPartner />
      </div>
    </>
  );
}
