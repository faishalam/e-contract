'use client';
import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

type TPaginationProps = {
  meta?: {
    has_next: boolean;
    has_previous: boolean;
    limit: number;
    page: number;
    total: number;
    total_pages: number;
  };
  onPageChange: (page: number) => void;
};

export default function Pagination({ meta, onPageChange }: TPaginationProps) {
  if (!meta) return null;

  const { page, total_pages, has_previous, has_next, total, limit } = meta;

  const generatePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(total_pages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < total_pages) {
      if (end < total_pages - 1) pages.push('...');
      pages.push(total_pages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-2">
      {/* Mobile version */}
      <div className="flex flex-1 justify-between sm:hidden gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!has_previous}
          className={`group relative inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            has_previous
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeftIcon fontSize="small" className="mr-1" />
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!has_next}
          className={`group relative inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            has_next
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRightIcon fontSize="small" className="ml-1" />
        </button>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="px-5 py-3">
          <p className="text-sm">
            <span className="text-gray-500">Menampilkan</span>{' '}
            <span className="text-gray-500">{(page - 1) * limit + 1}</span>
            <span className="text-gray-500">–</span>
            <span className="text-gray-500">{Math.min(page * limit, total)}</span>{' '}
            <span className="text-gray-500">dari</span>{' '}
            <span className="text-gray-500">{total}</span>{' '}
            <span className="text-gray-500">hasil</span>
          </p>
        </div>

        <nav aria-label="Pagination" className="flex items-center gap-1">
          {/* First Page Button */}
          <button
            onClick={() => onPageChange(1)}
            disabled={!has_previous}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
              has_previous
                ? 'text-indigo-600 hover:bg-indigo-50 hover:scale-110 active:scale-95'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="First Page"
          >
            <FirstPageIcon fontSize="small" />
          </button>

          {/* Previous Button */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={!has_previous}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
              has_previous
                ? 'text-indigo-600 hover:bg-indigo-50 hover:scale-110 active:scale-95'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeftIcon fontSize="small" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 mx-2">
            {generatePages().map((p, idx) =>
              p === '...' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="inline-flex items-center justify-center w-10 h-10 text-gray-400 font-bold"
                >
                  •••
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={`inline-flex items-center cursor-pointer justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                    p === page
                      ? 'text-white bg-[#f97316]'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {p}
                </button>
              ),
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={!has_next}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
              has_next
                ? 'text-indigo-600 hover:bg-indigo-50 hover:scale-110 active:scale-95'
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRightIcon fontSize="small" />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => onPageChange(total_pages)}
            disabled={!has_next}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
              has_next
                ? 'text-indigo-600 hover:bg-indigo-50 hover:scale-110 active:scale-95'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Last Page"
          >
            <LastPageIcon fontSize="small" />
          </button>
        </nav>
      </div>
    </div>
  );
}
