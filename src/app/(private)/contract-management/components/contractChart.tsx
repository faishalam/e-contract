'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useState } from 'react';
import useContractManagement from '../hooks';

const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'];

export default function ContractCharts() {
  const [range, setRange] = useState('6 Bulan Terakhir');
  const { lineData, pieData } = useContractManagement();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Card 1: Tren Kontrak */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-black mb-4">Quick Access</h2>
          <select
            value={range}
            onChange={e => setRange(e.target.value)}
            className="border rounded-md text-sm px-2 py-1"
          >
            <option>6 Bulan Terakhir</option>
            <option>12 Bulan Terakhir</option>
          </select>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" />
              <Line type="monotone" dataKey="signed" stroke="#10b981" name="Ditandatangani" />
              <Line type="monotone" dataKey="pending" stroke="#f59e0b" name="Menunggu" />
              <Line type="monotone" dataKey="expired" stroke="#ef4444" name="Kedaluwarsa" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Card 2: Jenis Kontrak */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-black mb-4">Quick Access</h2>
          <button className="text-blue-500 text-sm">➝</button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={pieColors[idx]} />
                ))}
              </Pie>
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
