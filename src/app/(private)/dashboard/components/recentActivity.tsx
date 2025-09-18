'use client';

import useDashboard from '../hooks';

export default function RecentActivity() {
  const { activitiesData } = useDashboard();
  return (
    <div className="bg-white w-full p-4 rounded-md shadow-sm text-black">
      <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
      <div className="flex flex-col gap-5">
        {activitiesData.map((a, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div>{a.icon}</div>
            <div>
              <p className="text-sm font-medium">{a.text}</p>
              <p className="text-xs text-gray-500">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-orange-500 text-sm font-medium mt-4 cursor-pointer">View All Activity</p>
    </div>
  );
}
