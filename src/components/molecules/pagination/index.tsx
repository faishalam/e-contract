'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export type TMeta = {
  has_next: boolean;
  has_previous: boolean;
  limit: number;
  page: number;
  total: number;
  total_pages: number;
};

type TablePaginationProps = {
  /** Informasi meta dari response API */
  meta?: TMeta;
  /** Trigger untuk mengganti halaman */
  onPageChange: (page: number) => void;
  /** Trigger untuk mengganti limit */
  onLimitChange: (limit: number) => void;
  /** Opsi limit yang tersedia */
  limitOptions?: number[];
  /** Kustomisasi tampilan tambahan */
  className?: string;
};

const TablePagination: React.FC<TablePaginationProps> = ({
  meta,
  onPageChange,
  onLimitChange,
  limitOptions = [5, 10, 25, 50, 100],
  className = '',
}) => {
  if (!meta) return null;

  const { has_next, has_previous, limit, page, total, total_pages } = meta;

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total_pages) {
      onPageChange(newPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-white border-t border-gray-200 gap-3 ${className}`}
    >
      {/* Info & Limit */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="text-sm text-gray-700">
          Menampilkan <span className="font-medium">{startItem}</span>–
          <span className="font-medium">{endItem}</span> dari{' '}
          <span className="font-medium">{total}</span> data
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-gray-700">
            Per halaman:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="px-2 py-1 text-sm border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {limitOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={!has_previous}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Halaman pertama"
        >
          <ChevronsLeft size={20} />
        </button>

        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!has_previous}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Halaman sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="px-3 py-1 text-sm text-gray-700">
          Halaman <span className="font-medium">{page}</span> dari{' '}
          <span className="font-medium">{total_pages}</span>
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!has_next}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Halaman selanjutnya"
        >
          <ChevronRight size={20} />
        </button>

        <button
          onClick={() => handlePageChange(total_pages)}
          disabled={!has_next}
          className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Halaman terakhir"
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
