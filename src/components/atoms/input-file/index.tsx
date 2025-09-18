import { useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type TProps = {
  onChange?: (file: File) => void;
  id: string;
  label?: string;
  maxSize: number;
  onError?: string;
  disabled?: boolean;
  accept?: string;
  required?: boolean;
};

const CInputFile: React.FC<TProps> = props => {
  const [fileName, setFileName] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.size <= props.maxSize) {
          setFileName(file.name);
          props.onChange?.(file);
        } else {
          console.error(props.onError || 'File too large');
        }
      }
    },
    [props],
  );

  return (
    <Box>
      {props.label && (
        <Typography variant="body2" mb={0.5}>
          {props.label.replace(/\*$/, '')}
          {(props.required || props.label.endsWith('*')) && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}

      {/* Dropzone container */}
      <label htmlFor={props.id}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border="2px dashed #d1d5db"
          borderRadius="8px"
          py={6}
          sx={{
            cursor: props.disabled ? 'not-allowed' : 'pointer',
            bgcolor: props.disabled ? '#f9f9f9' : 'transparent',
            '&:hover': {
              bgcolor: props.disabled ? '#f9f9f9' : '#fafafa',
            },
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 40, color: 'gray', mb: 1 }} />
          <Typography variant="body2">
            <span style={{ color: '#f97316', fontWeight: 500 }}>Upload a file</span> or drag and
            drop
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PDF, DOC, DOCX up to {props.maxSize / 1000000}MB
          </Typography>
        </Box>
      </label>

      {/* Hidden input */}
      <input
        type="file"
        id={props.id}
        hidden
        accept={props.accept || '.pdf,.doc,.docx'}
        disabled={props.disabled}
        onChange={handleChange}
      />

      {/* Show file name if selected */}
      {fileName && (
        <Typography variant="body2" mt={1} color="text.secondary">
          Selected file: {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default CInputFile;
