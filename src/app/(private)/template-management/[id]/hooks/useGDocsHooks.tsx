'use client';

import { useModalWarningInfo } from '@/components/atoms/modal-warning';
import { createContext, useCallback, useContext, useEffect, useState, useRef } from 'react';
import useTemplateHooks from '../../hooks';

type TVariable = {
  id: string;
  name: string;
  desc: string;
  icon: string;
};

const useGoogleDocsHooks = () => {
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
  const modalWarningInfo = useModalWarningInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [lastInsertedVariable, setLastInsertedVariable] = useState<string | null>(null);
  const { dataTemplateById } = useTemplateHooks();

  const hasUpdatedDoc = useRef(false);
  const lastUpdateHash = useRef<string>('');

  const isTokenExpired = useCallback(() => {
    if (typeof window === 'undefined') return true;

    const expiryTime = localStorage.getItem('googleTokenExpiry');
    if (!expiryTime) return true;

    return new Date().getTime() > parseInt(expiryTime);
  }, []);

  // const getAccessToken = useCallback(
  //   (scopes: string[]) => {
  //     if (!isGoogleScriptLoaded) {
  //       setAuthError('Google script not loaded yet. Please try again.');
  //       return;
  //     }

  //     try {
  //       setIsLoading(true);
  //       setAuthError(null);

  //       const client = window.google.accounts.oauth2.initTokenClient({
  //         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  //         scope: scopes.join(' '),
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         callback: (resp: any) => {
  //           if (resp.access_token) {
  //             // Store token with expiry from response or default to 1 hour
  //             const expiryTime = resp.expires_in
  //               ? new Date().getTime() + resp.expires_in * 1000
  //               : new Date().getTime() + 60 * 60 * 1000;

  //             localStorage.setItem('googleToken', resp.access_token);
  //             localStorage.setItem('googleTokenExpiry', expiryTime.toString());

  //             setGoogleToken(resp.access_token);
  //             setAuthError(null);
  //             setIsLoading(false);
  //           }
  //         },
  //         error_callback: (error: string) => {
  //           console.error('Auth error:', error);
  //           setAuthError('Authentication failed. Please try again.');
  //           setIsLoading(false);
  //         },
  //       });
  //       client.requestAccessToken();
  //     } catch (error) {
  //       console.error('Token request error:', error);
  //       setAuthError(error instanceof Error ? error.message : 'Failed to get access token.');
  //       setIsLoading(false);
  //     }
  //   },
  //   [isGoogleScriptLoaded],
  // );

  const getAccessToken = useCallback(
    (scopes: string[]) => {
      if (!isGoogleScriptLoaded) {
        setAuthError('Google script not loaded yet. Please try again.');
        return;
      }

      try {
        setIsLoading(true);
        setAuthError(null);
        if (documentId) {
          if (googleToken && !isTokenExpired()) {
            setIsLoading(false);
            return;
          }
        }

        // if docId is not present or token is expired, rerquest a new token
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          scope: scopes.join(' '),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: (resp: any) => {
            if (resp.access_token) {
              const expiryTime = resp.expires_in
                ? new Date().getTime() + resp.expires_in * 1000
                : new Date().getTime() + 60 * 60 * 1000;

              localStorage.setItem('googleToken', resp.access_token);
              localStorage.setItem('googleTokenExpiry', expiryTime.toString());

              setGoogleToken(resp.access_token);
              setAuthError(null);
              setIsLoading(false);

              console.log('✅ Google token acquired successfully');
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
    [isGoogleScriptLoaded, dataTemplateById?.google_docs_id, googleToken, isTokenExpired],
  );

  const createGoogleDoc = useCallback(async (accessToken: string) => {
    if (!accessToken) return null;

    try {
      setIsCreatingDoc(true);
      setAuthError(null);

      const res = await fetch('https://docs.googleapis.com/v1/documents', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Template' }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create document: ${res.status}`);
      }

      const data = await res.json();

      if (data.documentId) {
        setDocumentId(data.documentId);
        localStorage.setItem('documentId', data.documentId);

        // Reset flag saat document baru dibuat
        hasUpdatedDoc.current = false;
        lastUpdateHash.current = '';

        return data.documentId;
      }

      return null;
    } catch (error) {
      console.error('Error creating Google Doc:', error);
      setAuthError('Failed to create Google Document. Please try again.');
      return null;
    } finally {
      setIsCreatingDoc(false);
    }
  }, []);

  const deleteGoogleDoc = useCallback(async (accessToken: string, docId: string) => {
    try {
      const res = await fetch(`https://www.googleapis.com/drive/v3/files/${docId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error deleting Google Doc:', error);
      return false;
    }
  }, []);

  const getGoogleDoc = useCallback(
    async (
      accessToken: string,
      docId: string,
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<any | string | null> => {
      if (!accessToken || !docId) {
        console.warn('Missing accessToken or documentId for getGoogleDoc');
        return null;
      }
      try {
        // Always use Docs REST API to avoid CORS/redirect issues from web-export URLs
        const url = `https://docs.googleapis.com/v1/documents/${docId}`;
        const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });

        if (!res.ok) {
          const text = await res.text();
          // surface auth errors to UI
          if (res.status === 401 || res.status === 403) {
            setAuthError('Unauthorized to access this Google Document. Please reconnect.');
          }
          throw new Error(`Failed to get document: ${res.status} - ${text}`);
        }

        const data = await res.json();

        return data;
      } catch (error) {
        console.error('❌ Error fetching Google Doc:', error);
        return null;
      }
    },
    [],
  );

  const clearTokens = useCallback(
    async (deleteDoc: boolean = false) => {
      if (deleteDoc && googleToken && documentId && !isTokenExpired()) {
        await deleteGoogleDoc(googleToken, documentId);
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('googleToken');
        localStorage.removeItem('googleTokenExpiry');
        localStorage.removeItem('documentId');
      }
      setGoogleToken(null);
      setDocumentId(null);

      hasUpdatedDoc.current = false;
      lastUpdateHash.current = '';
    },
    [googleToken, documentId, isTokenExpired, deleteGoogleDoc],
  );

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
    [googleToken, documentId, modalWarningInfo],
  );

  const exportDocumentAsHTML = useCallback(
    async (accessToken: string, docId: string): Promise<string | null> => {
      if (!accessToken || !docId) {
        console.warn('Missing accessToken or documentId');
        return null;
      }

      try {
        const exportUrl = `https://www.googleapis.com/drive/v3/files/${docId}/export?mimeType=text/html`;

        const response = await fetch(exportUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setAuthError('Unauthorized. Please reconnect to Google Docs.');
          }
          throw new Error(`Failed to export document: ${response.status}`);
        }

        const htmlContent = await response.text();
        const cleaned = cleanupExportedHTML(htmlContent);
        return cleaned;
      } catch {
        return null;
      }
    },
    [],
  );

  const cleanupExportedHTML = (html: string): string => {
    let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    cleaned = cleaned.replace(/<meta[^>]*>/gi, '');

    const customStyles = `
    <style>
      /* Base document styling */
      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #000000;
        max-width: 816px; /* A4 width at 96 DPI */
        margin: 0 auto;
        padding: 96px 72px; /* Google Docs margins */
        background: white;
      }
      
      /* Preserve Google Docs table styling */
      table {
        border-collapse: collapse;
        width: 100%;
      }
      
      table td, table th {
        border: 1px solid #000;
        padding: 5px 8px;
        vertical-align: top;
      }
      
      /* Preserve list styling */
      ul, ol {
        padding-left: 40px;
        margin: 6px 0;
      }
      
      li {
        margin-bottom: 6px;
      }
      
      /* Preserve heading styling */
      h1, h2, h3, h4, h5, h6 {
        font-weight: bold;
        margin-top: 18px;
        margin-bottom: 6px;
      }
      
      /* Preserve paragraph spacing */
      p {
        margin: 0 0 12px 0;
        line-height: 1.6;
      }
      
      /* Preserve link styling */
      a {
        color: #1155cc;
        text-decoration: underline;
      }
      
      a:visited {
        color: #6611cc;
      }
      
      /* Image styling */
      img {
        max-width: 100%;
        height: auto;
      }
      
      /* Print styles */
      @media print {
        body {
          padding: 0;
        }
      }
    </style>
  `;

    if (cleaned.includes('</head>')) {
      cleaned = cleaned.replace('</head>', `${customStyles}</head>`);
    } else {
      cleaned = `<!DOCTYPE html><html><head>${customStyles}</head><body>${cleaned}</body></html>`;
    }

    return cleaned;
  };

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

  useEffect(() => {
    const createDocumentIfNeeded = async () => {
      if (
        googleToken &&
        !isTokenExpired() &&
        !documentId &&
        !isCreatingDoc &&
        isGoogleScriptLoaded
      ) {
        await createGoogleDoc(googleToken);
      }
    };

    createDocumentIfNeeded();
  }, [
    googleToken,
    documentId,
    isCreatingDoc,
    isGoogleScriptLoaded,
    isTokenExpired,
    createGoogleDoc,
  ]);

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      if (googleToken && isTokenExpired()) {
        clearTokens();
      }
      setIsLoading(false);
    }
  }, [isGoogleScriptLoaded, googleToken, isTokenExpired, clearTokens]);

  useEffect(() => {
    if (dataTemplateById?.google_docs_id) {
      setDocumentId(dataTemplateById?.google_docs_id);
    }
  }, [dataTemplateById]);

  return {
    isLoading,
    setIsLoading,
    isCreatingDoc,
    googleToken,
    setGoogleToken,
    getGoogleDoc,
    cleanupExportedHTML,
    getAccessToken,
    createGoogleDoc,
    documentId,
    authError,
    isGoogleScriptLoaded,
    clearTokens,
    deleteGoogleDoc,
    insertVariable,
    isInserting,
    exportDocumentAsHTML,
    setDocumentId,
    lastInsertedVariable,
  };
};

const GoogleDocsContext = createContext<ReturnType<typeof useGoogleDocsHooks> | undefined>(
  undefined,
);

export const GoogleDocsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useGoogleDocsHooks();
  return <GoogleDocsContext.Provider value={value}>{children}</GoogleDocsContext.Provider>;
};

export const useGoogleDocs = () => {
  const context = useContext(GoogleDocsContext);
  if (context === undefined) {
    throw new Error('GoogleDocsContext must be used within an GoogleDocsProvider');
  }
  return context;
};

export default useGoogleDocs;
