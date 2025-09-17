import React from 'react';

type ImportCardProps = {
  icon: React.ReactNode;
  title: string;
  status?: 'Terhubung' | 'Perlu koneksi';
  description: string;
  background?: string;
};

const ImportCard: React.FC<ImportCardProps> = ({
  icon,
  title,
  status,
  description,
  background,
}) => {
  return (
    <div className="w-full rounded-md border border-gray-200 bg-white p-9 hover:shadow-sm transition cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-md ${background ? background : 'bg-gray-100'}`}
        >
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          {status && (
            <span
              className={`text-xs ${status === 'Terhubung' ? 'text-green-600' : 'text-gray-500'}`}
            >
              {status}
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-5">{description}</p>
    </div>
  );
};

export default ImportCard;
