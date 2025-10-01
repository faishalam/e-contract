import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Data dummy untuk Registrasi Merchant Bulanan
const monthlyRegistrationData = [
  { month: 'Jan', registrasiBaru: 18, verifikasiBerhasil: 15 },
  { month: 'Feb', registrasiBaru: 22, verifikasiBerhasil: 18 },
  { month: 'Mar', registrasiBaru: 28, verifikasiBerhasil: 24 },
  { month: 'Apr', registrasiBaru: 34, verifikasiBerhasil: 28 },
  { month: 'May', registrasiBaru: 32, verifikasiBerhasil: 27 },
  { month: 'Jun', registrasiBaru: 38, verifikasiBerhasil: 35 },
  { month: 'Jul', registrasiBaru: 38, verifikasiBerhasil: 33 },
  { month: 'Aug', registrasiBaru: 45, verifikasiBerhasil: 39 },
];

// Data dummy untuk Distribusi Paket Langganan
const subscriptionDistributionData = [
  { name: 'Basic', value: 89, color: '#6B7280' },
  { name: 'Professional', value: 98, color: '#3B82F6' },
  { name: 'Enterprise', value: 35, color: '#8B5CF6' },
  { name: 'Trial', value: 25, color: '#F59E0B' },
];

export default function MerchantCharts() {
  const totalSubscriptions = subscriptionDistributionData.reduce(
    (sum, item) => sum + item.value,
    0,
  );
  return (
    <>
      {/* Grafik Registrasi Merchant Bulanan */}
      <div className="bg-white w-full p-4 rounded-md shadow-sm">
        <h2 className="font-bold text-lg text-black mb-2">Registrasi Merchant Bulanan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRegistrationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} iconType="circle" />
            <Bar
              dataKey="registrasiBaru"
              fill="#3B82F6"
              name="Registrasi Baru"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="verifikasiBerhasil"
              fill="#10B981"
              name="Verifikasi Berhasil"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Distribusi Paket Langganan */}
      <div className="bg-white w-full p-4 rounded-md shadow-sm">
        <h2 className="font-bold text-lg text-black mb-2">Distribusi Paket Langganan</h2>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={subscriptionDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={true}
              >
                {subscriptionDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name) => [
                  `${value} (${((value / totalSubscriptions) * 100).toFixed(1)}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Custom */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {subscriptionDistributionData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-700">
                {item.name}: <span className="font-semibold">{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
