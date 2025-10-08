'use client';

import { Box, Typography } from '@mui/material';
import { useState, useId } from 'react';

type TCardOptionProps = {
  title: string;
  description: string;
  subDescription?: string;
  icon: React.ReactNode;
  type?: 'button' | 'file';
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  active?: boolean;
  label?: string | React.ReactNode;
  required?: boolean;
  onClick?: () => void;
  onChangeFile?: (file: File) => void;
  className?: string;
  error?: boolean;
  helperText?: string;
};

const CInputFileCustom: React.FC<TCardOptionProps> = ({
  title,
  description,
  subDescription,
  icon,
  type = 'button',
  accept,
  maxSize = 50 * 1024 * 1024, // default 50MB
  disabled,
  active,
  onClick,
  label,
  required,
  onChangeFile,
  className = 'min-h-[200px]', // Default height jika tidak ada className
  error,
  helperText,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const reactId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size <= maxSize) {
        setFileName(file.name);
        onChangeFile?.(file);
      } else {
        console.error('File too large');
      }
    }
  };

  const cardContent = (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4,
        borderRadius: '12px',
        border: error ? '2px dashed #ef4444' : active ? '2px dashed #3b82f6' : '1px solid #e5e7eb',
        bgcolor: error ? '#fef2f2' : active ? '#eff6ff' : '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        '&:hover': {
          borderColor: disabled ? '#e5e7eb' : error ? '#ef4444' : '#3b82f6',
        },
        transition: 'all 0.2s ease',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight="600" gutterBottom className="text-black">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {subDescription && (
        <Typography variant="caption" display="block" mt={1} color="text.secondary">
          {subDescription}
        </Typography>
      )}
      {fileName && (
        <Typography
          variant="caption"
          display="block"
          mt={2}
          sx={{ color: '#2563eb', fontWeight: 500 }}
        >
          File dipilih: {fileName}
        </Typography>
      )}
    </Box>
  );

  const labelComponent = label && (
    <small className="block mb-2">
      <label htmlFor={reactId} className="font-medium text-gray-700">
        {typeof label === 'string' ? label.replace(/\*$/, '') : label}
        {(required || (typeof label === 'string' && label.endsWith('*'))) && (
          <span style={{ color: 'red' }}>*</span>
        )}
      </label>
    </small>
  );

  const helperTextComponent = helperText && (
    <Typography
      variant="caption"
      sx={{
        color: error ? '#ef4444' : '#6b7280',
        display: 'block',
        mt: 0.5,
        ml: 1.5,
      }}
    >
      {helperText}
    </Typography>
  );

  return (
    <div className="w-full">
      {labelComponent}
      {type === 'file' ? (
        <label style={{ display: 'block' }} htmlFor={reactId}>
          <input
            id={reactId}
            type="file"
            hidden
            accept={accept || '.pdf,.doc,.docx'}
            disabled={disabled}
            onChange={handleChange}
          />
          {cardContent}
        </label>
      ) : (
        <div onClick={!disabled ? onClick : undefined}>{cardContent}</div>
      )}
      {helperTextComponent}
    </div>
  );
};

export default CInputFileCustom;
