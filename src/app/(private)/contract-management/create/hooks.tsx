'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { useSearchParams } from 'next/navigation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const useCreateContractHooks = () => {
  const [stepNav, setStepNav] = useState<string>('');
  const steps = [
    { label: 'Metadata', path: 'metadata', icon: DescriptionIcon },
    { label: 'Konten', path: 'content', icon: EditIcon },
    { label: 'Persetujuan', path: 'approval', icon: VerifiedUserIcon },
    { label: 'Final', path: 'final', icon: DoneAllIcon },
  ];
  const paramsStep = useSearchParams();
  const step = paramsStep.get('step') || 'metadata';

  const [googleToken, setGoogleToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('googleToken');
    }
    return null;
  });

  const [documentId, setDocumentId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('documentId');
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    if (typeof window === 'undefined') return true;

    const expiryTime = localStorage.getItem('googleTokenExpiry');
    if (!expiryTime) return true;

    return new Date().getTime() > parseInt(expiryTime);
  }, []);

  // const clearTokens = useCallback(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.removeItem('googleToken');
  //     localStorage.removeItem('googleTokenExpiry');
  //     localStorage.removeItem('documentId');
  //   }
  //   setGoogleToken(null);
  //   setDocumentId(null);
  // }, []);

  const getAccessToken = useCallback(
    (scopes: string[]) => {
      if (!isGoogleScriptLoaded) {
        setAuthError('Google script not loaded yet. Please try again.');
        return;
      }

      try {
        setIsLoading(true);
        setAuthError(null);

        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          scope: scopes.join(' '),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (resp: any) => {
            if (resp.access_token) {
              // Store token with expiry from response or default to 1 hour
              const expiryTime = resp.expires_in
                ? new Date().getTime() + resp.expires_in * 1000
                : new Date().getTime() + 60 * 60 * 1000;

              localStorage.setItem('googleToken', resp.access_token);
              localStorage.setItem('googleTokenExpiry', expiryTime.toString());

              setGoogleToken(resp.access_token);
              setAuthError(null);
              setIsLoading(false);
            }
          },
          error_callback: (error: string) => {
            console.error('Auth error:', error);
            setAuthError('Authentication failed. Please try again.');
            setIsLoading(false);
          },
        });
        client.requestAccessToken();
      } catch (error) {
        console.error('Token request error:', error);
        setAuthError(error instanceof Error ? error.message : 'Failed to get access token.');
        setIsLoading(false);
      }
    },
    [isGoogleScriptLoaded],
  );

  const createGoogleDoc = useCallback(
    async (accessToken: string) => {
      if (!accessToken || documentId) return;

      try {
        setIsCreatingDoc(true);
        const res = await fetch('https://docs.googleapis.com/v1/documents', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: 'New Contract' }),
        });

        if (!res.ok) {
          throw new Error(`Failed to create document: ${res.status}`);
        }
        const data = await res.json();
        if (data.documentId) {
          setDocumentId(data.documentId);
          localStorage.setItem('documentId', data.documentId);
        }
      } catch (error) {
        console.error('Error creating Google Doc:', error);
        setAuthError('Failed to create Google Document. Please try again.');
      } finally {
        setIsCreatingDoc(false);
      }
    },
    [documentId],
  );

  const deleteGoogleDoc = useCallback(async (accessToken: string, docId: string) => {
    try {
      console.log('Deleting Google Doc:', docId);

      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${docId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        console.log('Document deleted successfully');
        return true;
      } else {
        console.error('Failed to delete document:', res.status, res.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting Google Doc:', error);
      return false;
    }
  }, []);

  const clearTokens = useCallback(
    async (deleteDoc: boolean = false) => {
      if (deleteDoc && googleToken && documentId && !isTokenExpired()) {
        console.log('Attempting to delete document before sign out...');
        await deleteGoogleDoc(googleToken, documentId);
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('googleToken');
        localStorage.removeItem('googleTokenExpiry');
        localStorage.removeItem('documentId');
      }
      setGoogleToken(null);
      setDocumentId(null);
    },
    [googleToken, documentId, isTokenExpired, deleteGoogleDoc],
  );

  // Initialize Google Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = () => {
      setIsGoogleScriptLoaded(true);
    };
    script.onerror = () => {
      setAuthError('Failed to load Google authentication script.');
      setIsGoogleScriptLoaded(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Handle token validation and document creation
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      // Check if we have a token and if it's expired
      if (googleToken && isTokenExpired()) {
        clearTokens();
        setIsLoading(false);
        return;
      }
      // If we have a valid token but no document, create one
      if (googleToken && !documentId && !isCreatingDoc) {
        await createGoogleDoc(googleToken);
      }
      setIsLoading(false);
    };
    if (isGoogleScriptLoaded) {
      initializeAuth();
    }
  }, [
    googleToken,
    documentId,
    isTokenExpired,
    clearTokens,
    createGoogleDoc,
    isGoogleScriptLoaded,
    isCreatingDoc,
  ]);

  return {
    isLoading,
    setIsLoading,
    isCreatingDoc,
    stepNav,
    setStepNav,
    steps,
    paramsStep,
    step,
    googleToken,
    setGoogleToken,
    getAccessToken,
    createGoogleDoc,
    documentId,
    authError,
    isGoogleScriptLoaded,
    clearTokens,
    deleteGoogleDoc,
  };
};

const CreateContractContext = createContext<ReturnType<typeof useCreateContractHooks> | undefined>(
  undefined,
);

export const CreateContractProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useCreateContractHooks();
  return <CreateContractContext.Provider value={value}>{children}</CreateContractContext.Provider>;
};

export const useCreateContract = () => {
  const context = useContext(CreateContractContext);
  if (context === undefined) {
    throw new Error('CreateContractContext must be used within an CreateContractProvider');
  }
  return context;
};

export default useCreateContract;
