'use client';

import useMerchantDetail from '../hooks';

const labels = [
  { label: 'Template Merchant' },
  { label: 'Template Tersedia' },
  { label: 'Aktifitas Kontrak' },
  { label: 'Pengguna' },
  { label: 'Pengaturan' },
];

export default function ActivityTabs() {
  const { activeTab, setActiveTab } = useMerchantDetail();

  return (
    <>
      <div className="flex space-x-8 max-w-full w-full overflow-x-auto">
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
