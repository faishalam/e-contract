import React from 'react';

type CardHeaderProps = {
  title: string;
  value: number | string;
  conclusion?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  iconBg?: string;
  index: number;
};

export default function CardHeader({
  title,
  value,
  conclusion,
  trend = 'neutral',
  icon,
  iconBg = 'bg-gray-100',
  index,
}: CardHeaderProps) {
  const trendColor =
    trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-orange-500';

  const accentColors = [
    'border-l-blue-500',
    'border-l-green-500',
    'border-l-yellow-500',
    'border-l-red-500',
  ];
  const accentColor = accentColors[index] || 'border-l-gray-300';

  return (
    <div
      className={`bg-white rounded-mdw shadow p-5 flex items-start justify-between border-l-4 ${accentColor}`}
    >
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {conclusion && <p className={`text-xs mt-1 ${trendColor}`}>{conclusion}</p>}
      </div>
      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}
