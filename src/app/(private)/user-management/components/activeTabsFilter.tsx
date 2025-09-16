'use client';
import React from 'react';
import useUserManagement from '../hooks';

const labels = [
  { label: 'All Activities' },
  { label: 'Contract Activities' },
  { label: 'User Activities' },
  { label: 'Signing Activities' },
  { label: 'System Activities' },
];

export default function ActivityTabs() {
  const { activeTab, setActiveTab } = useUserManagement();

  return (
    <>
      <div className="flex space-x-8">
        {labels.map(item => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`relative pb-2 text-sm font-medium transition-colors duration-200 cursor-pointer
              ${
                activeTab === item.label ? 'text-orange-500' : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {item.label}

            {activeTab === item.label && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </>
  );
}
