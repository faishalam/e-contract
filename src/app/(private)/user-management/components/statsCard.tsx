'use client';
import React from 'react';
import useUserManagement from '../hooks';

export default function StatsCard() {
  const { activities } = useUserManagement();

  return (
    <>
      {activities.map((stat, index) => (
        <React.Fragment key={stat.label}>
          <div className="flex-1 text-center px-4">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>

            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>

          {index < activities.length - 1 && <div className="h-10 w-px bg-gray-200" />}
        </React.Fragment>
      ))}
    </>
  );
}
