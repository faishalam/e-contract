import DataGrid from '@/components/molecules/datagrid';
import useDashboard from '../hooks';
import { Button, LinearProgress } from '@mui/material';

export default function RecentPartners() {
  const { recentPartnersColumnDef, partners, quotas } = useDashboard();
  return (
    <>
      {/* Recent Partners */}
      <div className="lg:col-span-2 bg-white rounded-md shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-black">Recent Partners</h2>
          <p className="text-orange-500 text-sm font-medium cursor-pointer">View All Partners</p>
        </div>
        {/* <DataGrid columnDefs={recentPartnersColumnDef} rowData={partners} pagination={false} /> */}
      </div>

      {/* Quota */}
      <div className="bg-white rounded-md shadow-sm p-4">
        <h2 className="font-bold text-lg text-black mb-4">e-Sign & e-Stamp Quota</h2>
        {quotas.map((q, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex justify-between text-sm text-black mb-1">
              <span>{q.label}</span>
              <span>
                {q.used} / {q.total}
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={(q.used / q.total) * 100}
              className="rounded-full h-2"
            />
          </div>
        ))}
        <p className="text-xs text-gray-500 mt-2">
          Last Top-up: <span className="text-black font-medium">June 1, 2023</span>
        </p>
        <Button variant="contained" fullWidth className="!bg-orange-500 !mt-3 !capitalize">
          Purchase Additional Quota
        </Button>
      </div>
    </>
  );
}
