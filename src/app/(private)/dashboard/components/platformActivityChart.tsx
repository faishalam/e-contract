'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useDashboard from '../hooks';

// PlatformActivityChart.tsx
export default function PlatformActivityChart() {
  const [filter, setFilter] = useState<'Monthly' | 'Weekly' | 'Daily'>('Monthly');
  const { platformActivityData } = useDashboard();

  return (
    <div className="bg-white w-full p-4 rounded-md shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-black">Platform Activity</h2>
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

      {/* biar chart fleksibel ambil sisa space */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={platformActivityData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="newContracts" fill="#f97316" name="New Contracts" />
            <Bar dataKey="completedContracts" fill="#22c55e" name="Completed Contracts" />
            <Bar dataKey="newUsers" fill="#ef4444" name="New Users" />
            <Bar dataKey="quota" fill="#6366f1" name="Quota Purchases" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
