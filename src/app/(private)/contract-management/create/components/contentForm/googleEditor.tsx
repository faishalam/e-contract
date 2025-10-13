import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { Button } from '@mui/material';
import { LoaderIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import useGoogleDocs from '../../context/useGoogleDocs';

export default function GoogleEditor() {
  const {
    googleToken,
    documentId,
    isLoading,
    isCreatingDoc,
    authError,
    isGoogleScriptLoaded,
    getAccessToken,
    clearTokens,
    deleteGoogleDoc,
  } = useGoogleDocs();
  const modalWarningInfo = useModalWarningInfo();

  const handleConnectDocs = () => {
    getAccessToken([
      'https://www.googleapis.com/auth/documents',
      'https://www.googleapis.com/auth/drive.file',
    ]);
  };

  const handleSignOut = () => {
    modalWarningInfo.open({
      title: 'Sign Out',
      message: (
        <div>
          <p>
            Are you sure you want to sign out? Any unsaved changes in the Google Document may be
            lost.
          </p>
        </div>
      ),
      onConfirm: () => {
        deleteGoogleDoc(googleToken as string, documentId as string);
        clearTokens();
      },
    });
  };

  return (
    <>
      <div className="w-full h-full rounded-md shadow bg-white">
        {(isLoading || isCreatingDoc) && (
          <div className="w-full h-full flex justify-center">
            <div className="text-center mt-20">
              <LoaderIcon className="text-black animate-spin mb-4 mx-auto" size={40} />
              <p className="text-gray-700 font-medium">
                {isCreatingDoc ? 'Creating Google Document...' : 'Initializing...'}
              </p>
            </div>
          </div>
        )}

        {!isLoading && !isCreatingDoc && (!googleToken || !documentId) && (
          <div className="w-full h-full flex justify-center">
            <div className="text-center p-8 mt-20">
              <div className="mb-6">
                <p className="text-black font-semibold text-lg mb-2">
                  Sign in with Google to use the editor
                </p>
                {authError && <p className="text-red-600 text-sm">{authError}</p>}
              </div>
              <Button
                onClick={handleConnectDocs}
                disabled={!isGoogleScriptLoaded}
                startIcon={<FcGoogle />}
                className="!bg-white !text-black !capitalize !border !rounded !hover:bg-gray-100 !shadow !border-gray-300 !mb-4"
              >
                {!isGoogleScriptLoaded ? 'Loading...' : 'Sign in with Google'}
              </Button>

              <p className="text-gray-400 text-sm">
                You will need to grant access to Google Docs to continue
              </p>

              {!isGoogleScriptLoaded && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-600 text-sm">Loading Google services...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {!isLoading && !isCreatingDoc && googleToken && documentId && (
          <div className="w-full h-full relative">
            <div className="absolute top-4 right-4 z-30 bg-white shadow-md rounded-lg px-3 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Connected</span>
              <button onClick={handleSignOut} className="text-xs text-red-600 hover:underline ml-2">
                Sign Out
              </button>
            </div>

            <iframe
              key={documentId}
              src={`https://docs.google.com/document/d/${documentId}/edit?usp=sharing`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Google Docs Editor"
              allow="clipboard-read; clipboard-write; web-share"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </>
  );
}
