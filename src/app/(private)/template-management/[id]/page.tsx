'use client';
import { DndProvider } from 'react-dnd';
import GoogleEditor from './components/googleEditor';
import RightPanel from './components/RightPanel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftPanel from './components/leftPanel';
import { Button } from '@mui/material';
import { BlockingLoader } from '@/components/atoms/loader';
import useTemplateHooks from './hooks/hooks';
import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { useRouter } from 'next/navigation';
import useGoogleDocs from './hooks/useGDocsHooks';

export default function Page() {
  const { onSubmit, isLoadingCreateTemplate, isLoadingUpdateTemplate, id } = useTemplateHooks();
  const { deleteGoogleDoc, clearTokens, googleToken, documentId } = useGoogleDocs();
  const modalWarningInfo = useModalWarningInfo();
  const router = useRouter();

  return (
    <>
      {(isLoadingCreateTemplate || isLoadingUpdateTemplate) && <BlockingLoader />}
      <div className="w-full gap-6 flex flex-col md:flex-row">
        <DndProvider backend={HTML5Backend}>
          <div className="w-full md:max-w-1/5 md:w-full h-full">
            <LeftPanel />
          </div>

          <form className="w-full max-w-full">
            <GoogleEditor />

            <div className="w-full flex justify-end mt-5 mb-5 gap-3">
              <Button
                onClick={() => {
                  modalWarningInfo.open({
                    title: 'Cancel',
                    message: (
                      <div>
                        <p>Are you sure you want to cancel? All unsaved changes will be lost.</p>
                      </div>
                    ),
                    onConfirm: () => {
                      clearTokens();
                      router.push('/template-management');
                      if (!id) deleteGoogleDoc(googleToken as string, documentId as string);
                    },
                  });
                }}
                variant="outlined"
                className="!shadow-sm !bg-white hover:!bg-gray-200 !border-gray-300 !text-black !capitalize"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  onSubmit();
                }}
              >
                Submit
              </Button>
            </div>
          </form>
          <div className="w-full md:max-w-1/5 md:w-full h-full">
            <RightPanel />
          </div>
        </DndProvider>
      </div>
    </>
  );
}
