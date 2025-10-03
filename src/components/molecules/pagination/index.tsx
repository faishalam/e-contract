import * as React from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  dataLength: number;
  className?: string;
}

export default function TablePagination({
  page,
  setPage,
  limit,
  dataLength,
  className = '',
}: TablePaginationProps) {
  const hasNextPage = dataLength === limit;
  const hasPrevPage = page > 1;

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };

  const from = dataLength ? (page - 1) * limit + 1 : 0;
  const to = dataLength ? (page - 1) * limit + dataLength : 0;

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 bg-white rounded-b-md shadow ${className}`}
    >
      {/* Info */}
      <div className="flex items-center text-sm text-gray-700">
        <span>
          Menampilkan <span className="font-medium">{from}</span> sampai{' '}
          <span className="font-medium">{to}</span>
        </span>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <IconButton onClick={handlePrevPage} disabled={!hasPrevPage} size="small">
          <ChevronLeft
            fontSize="small"
            className={hasPrevPage ? 'text-gray-700' : 'text-gray-400'}
          />
        </IconButton>

        <span className="px-2 text-sm font-medium text-gray-700">Halaman {page}</span>

        <IconButton onClick={handleNextPage} disabled={!hasNextPage} size="small">
          <ChevronRight
            fontSize="small"
            className={hasNextPage ? 'text-gray-700' : 'text-gray-400'}
          />
        </IconButton>
      </div>
    </div>
  );
}
