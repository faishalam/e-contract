import { useState } from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import useEsign from '../hooks';

export default function UsageStatistics() {
  const [filter, setFilter] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');

  const { usageStatisticsData } = useEsign();

  return (
    <div className="w-full bg-white p-4 rounded-md shadow h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-black">Usage Statistics</h2>
        <div className="flex gap-2 cursor-pointer">
          {['Monthly', 'Weekly', 'Daily'].map(f => (
            <button
              key={f}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === f ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usageStatisticsData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="eSign" fill="#3b82f6" name="e-Sign Usage" />
            <Bar dataKey="eStamp" fill="#22c55e" name="e-Stamp Usage" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
