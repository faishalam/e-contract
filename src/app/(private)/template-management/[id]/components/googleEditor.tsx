import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { Button } from '@mui/material';
import { LoaderIcon } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useDrop } from 'react-dnd';
import { useState, useCallback, RefCallback } from 'react';
import useGoogleDocs from '../hooks/useGDocsHooks';
import useTemplateHooks from '../hooks/hooks';

// Constants for drag and drop
const ItemTypes = {
  VARIABLE: 'variable',
  CLAUSE: 'clause',
} as const;

// Types
type TVariable = {
  id: string;
  name: string;
  desc: string;
  icon: string;
};

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
  const { id } = useTemplateHooks();

  const modalWarningInfo = useModalWarningInfo();
  const [isInserting, setIsInserting] = useState(false);
  const [lastInsertedVariable, setLastInsertedVariable] = useState<string | null>(null);

  // Simple variable insertion to Google Docs
  const insertVariable = useCallback(
    async (variable: TVariable) => {
      if (!googleToken || !documentId) {
        modalWarningInfo.open({
          title: 'Not Connected',
          message: 'Please connect to Google Docs first before inserting variables.',
        });
        return;
      }
      setIsInserting(true);
      try {
        const formattedVar = variable.name.startsWith('[') ? variable.name : `[${variable.name}]`;
        const insertResponse = await fetch(
          `https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${googleToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              requests: [
                {
                  insertText: {
                    location: { index: 1 },
                    text: formattedVar + ' ',
                  },
                },
              ],
            }),
          },
        );

        if (!insertResponse.ok) {
          const errorText = await insertResponse.text();
          throw new Error(`Failed to insert variable: ${insertResponse.status} - ${errorText}`);
        }
        setLastInsertedVariable(variable.name);
        setTimeout(() => setLastInsertedVariable(null), 2000);
      } catch (error) {
        console.error('Error inserting variable:', error);
        modalWarningInfo.open({
          title: 'Insert Failed',
          message: `Failed to insert variable "${variable.name}". Please check your Google Docs connection and try again.`,
        });
      } finally {
        setIsInserting(false);
      }
    },
    [googleToken, documentId],
  );

  // Setup drop target with enhanced feedback
  const [{ isOver, canDrop, isDragActive }, drop] = useDrop<
    TVariable,
    void,
    { isOver: boolean; canDrop: boolean; isDragActive: boolean }
  >(
    () => ({
      accept: [ItemTypes.VARIABLE, ItemTypes.CLAUSE],
      drop: (item: TVariable) => {
        void insertVariable(item); // void to handle the promise
        return undefined;
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        isDragActive: !!monitor.getItem(),
      }),
    }),
    [insertVariable],
  );

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
        if (!id) deleteGoogleDoc(googleToken as string, documentId as string);
        clearTokens();
      },
    });
  };

  const isActive = isOver && canDrop;
  const isDragOver = isDragActive && canDrop;

  const dropRef = useCallback<RefCallback<HTMLDivElement>>(
    element => {
      drop(element);
    },
    [drop],
  );

  return (
    <div
      ref={dropRef}
      className={`w-full h-[calc(100vh-9.8rem)] rounded-md shadow bg-white relative transition-all duration-200 ${
        isActive ? 'ring-4 ring-blue-400 ring-opacity-50 bg-blue-50' : ''
      } ${isDragOver && !isActive ? 'ring-2 ring-green-400 ring-opacity-30 bg-green-50' : ''}`}
    >
      {/* Drop Indicator Overlay */}
      {isActive && (
        <div className="absolute inset-0 z-40 bg-blue-500 bg-opacity-10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-blue-500 border-dashed">
            <p className="text-blue-600 font-semibold text-lg">✓ Drop to insert variable</p>
          </div>
        </div>
      )}

      {/* Inserting Indicator */}
      {isInserting && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <LoaderIcon className="animate-spin" size={16} />
          <span className="text-sm">Inserting variable...</span>
        </div>
      )}

      {/* Success Notification */}
      {lastInsertedVariable && !isInserting && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          <span className="text-sm">✓ Inserted: {lastInsertedVariable}</span>
        </div>
      )}

      {/* Loading State */}
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

      {/* Not Connected State */}
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
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mt-4">
                <p className="text-yellow-600 text-sm">Loading Google services...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {!isLoading && !isCreatingDoc && googleToken && documentId && (
        <div className="w-full h-full relative">
          <div className="absolute top-4 right-4 z-30 bg-white shadow-md rounded-lg px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Connected</span>
            <button
              onClick={handleSignOut}
              type="button"
              className="text-xs text-red-600 hover:underline ml-2"
            >
              Sign Out
            </button>
          </div>

          {/* Drop Zone Hint */}
          {isDragOver && !isActive && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded-lg shadow-md animate-pulse">
              <span className="text-sm font-medium">
                ↓ Drop variable here to insert into document
              </span>
            </div>
          )}

          {/* Info about protected variables */}
          <div className="absolute bottom-4 left-4 z-30 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg shadow-sm text-xs max-w-xs">
            <p className="font-semibold mb-1">💡 Variable Protection</p>
            <p>
              Variables appear in <strong>blue background</strong>. They must be deleted as a whole
              unit.
            </p>
          </div>

          {/* Drop Overlay - This ensures drop events work over the iframe */}
          {isDragActive && (
            <div
              className="absolute inset-0 z-40 bg-transparent"
              style={{ pointerEvents: 'auto' }}
            />
          )}

          {/* Google Docs Iframe */}
          <iframe
            key={documentId}
            src={`https://docs.google.com/document/d/${documentId}/edit?usp=sharing`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              pointerEvents: isDragActive ? 'none' : 'auto', // Disable iframe interaction during drag
            }}
            title="Google Docs Editor"
            allow="clipboard-read; clipboard-write; web-share"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
