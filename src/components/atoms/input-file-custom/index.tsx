'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';

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
  onClick?: () => void;
  onChangeFile?: (file: File) => void;
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
  onChangeFile,
}) => {
  const [fileName, setFileName] = useState<string>('');

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
      sx={{
        flex: 1,
        p: 4,
        borderRadius: '12px',
        border: active ? '2px dashed #3b82f6' : '1px solid #e5e7eb',
        bgcolor: active ? '#eff6ff' : '#fff',
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        '&:hover': {
          borderColor: disabled ? '#e5e7eb' : '#3b82f6',
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

  return type === 'file' ? (
    <label style={{ flex: 1 }}>
      <input
        type="file"
        hidden
        accept={accept || '.pdf,.doc,.docx'}
        disabled={disabled}
        onChange={handleChange}
      />
      {cardContent}
    </label>
  ) : (
    <div style={{ flex: 1 }} onClick={!disabled ? onClick : undefined}>
      {cardContent}
    </div>
  );
};

export default CInputFileCustom;
