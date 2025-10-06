'use client';
import useMerchantManagement from './hooks';
import CardHeader from './components/cardHeader';
import MerchantCharts from './components/merchantChart';
import DataGrid from '@/components/molecules/datagrid';
import ButtonHeader from './components/buttonHeader';

export default function MarchantManaagementPage() {
  const { statisticsHeader, merchantColumnsDef, merchantData } = useMerchantManagement();
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
        <div className="w-full flex gap-4">
          <MerchantCharts />
        </div>

        {/* table */}
        <div className="bg-white w-full p-4 rounded-md shadow-sm">
          <h2 className="font-semibold text-lg text-black mb-4">Merchant List</h2>
          <div className="w-full overflow-y-scroll">
            <DataGrid
              columnDefs={merchantColumnsDef}
              rowData={merchantData}
              rowSelection="multiple"
            />
          </div>
        </div>
      </div>
    </>
  );
}
