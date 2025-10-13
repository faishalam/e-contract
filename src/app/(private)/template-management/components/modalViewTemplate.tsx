import { Box, Button, IconButton, Modal, Skeleton } from '@mui/material';
import useTemplateManagementHooks from '../hooks';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';

export default function ModalViewTemplate() {
  const {
    dataTemplateById,
    openModalTemplate,
    setOpenModalTemplate,
    setSelectedTemplateId,
    isLoadingDataTemplateById,
  } = useTemplateManagementHooks();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClose = () => {
    setOpenModalTemplate(false);
    setSelectedTemplateId('');
  };

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.print();
      } catch {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(dataTemplateById?.content ?? '');
          printWindow.document.close();
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 250);
        }
      }
    }
  };

  return (
    <Modal
      open={openModalTemplate}
      onClose={handleClose}
      aria-labelledby="modal-user-profile"
      className="flex justify-center items-center"
    >
      <Box
        sx={{
          width: '210mm',
          height: '95vh',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: 24,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
            mb: 1,
            backgroundColor: 'white',
            borderRadius: '4px',
            boxShadow: 0.5,
            flexShrink: 0,
          }}
        >
          <div className="flex w-full justify-between items-center">
            <Box>
              {isLoadingDataTemplateById ? (
                <Skeleton variant="text" width={160} height={24} />
              ) : (
                <h2 className="text-black font-md font-medium">
                  {dataTemplateById?.template_name}
                </h2>
              )}
            </Box>
            <Button
              variant="contained"
              onClick={handlePrint}
              size="small"
              sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}
              disabled={isLoadingDataTemplateById}
            >
              Print
            </Button>
          </div>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'white',
            boxShadow: 0.5,
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            minHeight: 0,
          }}
        >
          {isLoadingDataTemplateById ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                p: 2,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="100%" className="rounded-md" />
            </Box>
          ) : dataTemplateById?.content ? (
            <iframe
              ref={iframeRef}
              srcDoc={dataTemplateById?.content}
              sandbox="allow-same-origin allow-modals allow-popups"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block',
              }}
              title="Document Preview"
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <p className="text-gray-500">Tidak ada dokumen untuk ditampilkan</p>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
