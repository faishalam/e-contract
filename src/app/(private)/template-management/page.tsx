'use client';
import SearchIcon from '@mui/icons-material/Search';
import CInput from '@/components/atoms/input';
import ButtonHeader from './components/buttonHeader';
import CardHeader from './components/cardHeader';
import useTemplateManagementHooks from './hooks';
import CAutoComplete from '@/components/atoms/auto-complete';
import CardTemplate from './components/cardTemplate';
import ModalViewTemplate from './components/modalViewTemplate';
import Pagination from './components/pagination';

export default function TemplateManagementPage() {
  const {
    statisticsHeader,
    search,
    setSearch,
    filter,
    setFilter,
    openModalTemplate,
    dataTemplateList,
    setPage,
  } = useTemplateManagementHooks();
  return (
    <div className="w-full flex flex-col gap-6">
      {/* button header */}
      <div className="w-full flex justify-between items-center gap-80">
        <ButtonHeader />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticsHeader.map((stat, idx) => (
          <CardHeader key={idx} {...stat} />
        ))}
      </div>
      <div className="bg-white p-4 rounded-md shadow flex justify-between items-center gap-4 w-full">
        <CInput
          className="w-1/2"
          type="text"
          placeholder="Search template"
          icon={<SearchIcon className="text-black" />}
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
        <CAutoComplete
          options={[
            { label: 'Aktif', value: 'active' },
            { label: 'Tidak Aktif', value: 'inactive' },
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
        <CAutoComplete
          options={[]}
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
          placeholder="Pembuat"
        />
        <CAutoComplete
          options={[]}
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
          placeholder="Merchant"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full justify-center items-center">
          <CardTemplate />
        </div>
        <Pagination
          meta={dataTemplateList?.meta}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>
      {openModalTemplate && <ModalViewTemplate />}
    </div>
  );
}
