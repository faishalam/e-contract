import { Description, LocalOffer } from '@mui/icons-material';

const usageLogs = [
  {
    id: 1,
    type: 'e-Sign',
    action: 'used for "Logistics Service Agreement"',
    time: 'Today, 10:45 AM',
    user: 'Budi Santoso',
    status: 'Successful',
  },
  {
    id: 2,
    type: 'e-Stamp',
    action: 'applied to "IT Service Agreement"',
    time: 'Today, 09:30 AM',
    user: 'Anisa Wijaya',
    status: 'Successful',
  },
  {
    id: 3,
    type: 'e-Sign',
    action: 'used for "Marketing Partnership"',
    time: 'Yesterday, 16:20 PM',
    user: 'Dewi Lestari',
    status: 'Successful',
  },
  {
    id: 4,
    type: 'e-Stamp',
    action: 'applied to "Supply Chain Agreement"',
    time: 'Yesterday, 14:05 PM',
    user: 'Anisa Wijaya',
    status: 'Successful',
  },
  {
    id: 5,
    type: 'e-Sign',
    action: 'failed for "Vendor Agreement"',
    time: '2 days ago, 11:30 AM',
    user: 'Rudi Hartono',
    status: 'Failed',
  },
];

export default function RecentUsageLogs() {
  return (
    <div className="w-full bg-white p-4 rounded-md shadow h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-black">Recent Usage Logs</h2>
        <button className="flex items-center gap-1 text-orange-500 text-sm font-medium">
          <span className="material-icons text-orange-500">filter_alt</span>
          Filter
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {usageLogs.map(log => (
          <div key={log.id} className="flex items-start gap-3 border-b last:border-0 pb-3">
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                log.type === 'e-Sign' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {log.type === 'e-Sign' ? (
                <Description fontSize="small" />
              ) : (
                <LocalOffer fontSize="small" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{log.type}</span> {log.action}
              </p>
              <p className="text-xs text-gray-500">
                {log.time} • By {log.user}
              </p>

              {/* Status */}
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                  log.status === 'Successful'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {log.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <button className="text-orange-500 font-medium text-sm">View All Logs</button>
      </div>
    </div>
  );
}
