'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import useCreateContract from '../hooks';
import { TContractForm } from '../validator';

const contractTemplates = {
  standard: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on {{EFFECTIVE_DATE}} between:

First Party: {{FIRST_PARTY_NAME}}, a company incorporated under Indonesian law with its registered office at Jl. Banda No. 30, Jakarta Pusat 10110, Indonesia ("POS Indonesia").

Second Party: {{SECOND_PARTY_NAME}}, a company incorporated under Indonesian law with its registered office at {{SECOND_PARTY_ADDRESS}} ("Service Provider").

1. INTRODUCTION

1.1 Purpose
This Agreement establishes the terms and conditions under which the Service Provider will provide {{SERVICE_DESCRIPTION}} to POS Indonesia for the duration specified herein.

2. SCOPE OF SERVICES
The Service Provider agrees to provide the following services:
- Package pickup and delivery services within {{DELIVERY_TIMEFRAME}}
- Real-time tracking and monitoring systems  
- Customer support and complaint handling services
- Regular reporting and analytics dashboard access
- Insurance coverage for packages up to {{CONTRACT_VALUE}}

3. TERMS AND CONDITIONS
The Service Provider shall:
- Maintain professional standards in all service delivery operations
- Comply with all applicable laws and regulations in Indonesia
- Provide services within agreed timeframes as specified
- Maintain confidentiality of all client information and data
- Provide adequate insurance coverage for all handled packages
- Submit monthly performance reports by the 5th of each month

4. PAYMENT TERMS
Payment terms are as follows:
- Total contract value: {{CURRENCY}} {{CONTRACT_VALUE}}
- Payment schedule: {{PAYMENT_TERMS}}
- Late payment penalty: 2% per month on outstanding amounts
- All payments to be made in Indonesian Rupiah unless otherwise specified

5. TERMINATION
This agreement may be terminated by either party with 30 days written notice.

Contract Type: {{CONTRACT_TYPE}}
PIC Internal: {{PIC_INTERNAL}}  
Department: {{DEPARTMENT}}

6. SIGNATURES
This agreement is signed on {{CURRENT_DATE}}.

_____________________
POS Indonesia Representative

_____________________
{{SECOND_PARTY_NAME}} Representative`,

  nda: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {{EFFECTIVE_DATE}} between:

First Party: {{FIRST_PARTY_NAME}}
Second Party: {{SECOND_PARTY_NAME}} with address at {{SECOND_PARTY_ADDRESS}}

CONFIDENTIALITY TERMS:
The parties agree to maintain confidentiality of all shared information related to this {{CONTRACT_TYPE}} agreement.

Contract Details:
- Contract Value: {{CURRENCY}} {{CONTRACT_VALUE}}
- Service Description: {{SERVICE_DESCRIPTION}}
- Delivery Timeframe: {{DELIVERY_TIMEFRAME}}
- Payment Terms: {{PAYMENT_TERMS}}
- PIC Internal: {{PIC_INTERNAL}}
- Department: {{DEPARTMENT}}

This NDA is effective from {{EFFECTIVE_DATE}} until {{EXPIRY_DATE}}.

Signed on {{CURRENT_DATE}}.

_____________________
{{FIRST_PARTY_NAME}} Representative

_____________________
{{SECOND_PARTY_NAME}} Representative`,

  procurement: `PROCUREMENT AGREEMENT

This Procurement Agreement ("Agreement") is entered into on {{EFFECTIVE_DATE}} between:

Purchaser: {{FIRST_PARTY_NAME}}
Vendor: {{SECOND_PARTY_NAME}}
Vendor Address: {{SECOND_PARTY_ADDRESS}}

PROCUREMENT DETAILS:
- Contract Type: {{CONTRACT_TYPE}}
- Contract Value: {{CURRENCY}} {{CONTRACT_VALUE}}
- Service Description: {{SERVICE_DESCRIPTION}}
- Delivery Timeframe: {{DELIVERY_TIMEFRAME}}
- Payment Terms: {{PAYMENT_TERMS}}

MANAGEMENT:
- PIC Internal: {{PIC_INTERNAL}}
- Department: {{DEPARTMENT}}

TERMS:
1. The Vendor agrees to provide the specified services/goods as described.
2. Payment will be made according to the agreed payment terms.
3. All deliveries must be completed within the specified timeframe.
4. Quality standards must be maintained throughout the contract period.

CONTRACT PERIOD:
This agreement is valid from {{EFFECTIVE_DATE}} until {{EXPIRY_DATE}}.

Signed on {{CURRENT_DATE}}.

_____________________
{{FIRST_PARTY_NAME}} Representative

_____________________
{{SECOND_PARTY_NAME}} Representative`,
};

type TOption = {
  value: string;
  label: string;
};

interface TemplateVariables {
  FIRST_PARTY_NAME: string;
  SECOND_PARTY_NAME: string;
  SECOND_PARTY_ADDRESS: string;
  EFFECTIVE_DATE: string;
  EXPIRY_DATE: string;
  CURRENT_DATE: string;
  CONTRACT_VALUE: string;
  CURRENCY: string;
  PAYMENT_TERMS: string;
  SERVICE_DESCRIPTION: string;
  DELIVERY_TIMEFRAME: string;
  PIC_INTERNAL: string;
  DEPARTMENT: string;
  CONTRACT_TYPE: string;
}

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

  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [isUpdatingDoc, setIsUpdatingDoc] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  // Menggunakan ref untuk tracking update status
  const hasUpdatedDoc = useRef(false);
  const lastUpdateHash = useRef<string>('');

  const { getValues } = useCreateContract();
  const values = getValues();

  // Memoize formData untuk menghindari infinite loop
  const formData = useMemo(() => {
    return values;
  }, [values]);

  // Generate hash dari formData untuk tracking perubahan
  const formDataHash = useMemo(() => {
    return JSON.stringify(formData);
  }, [formData]);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    if (typeof window === 'undefined') return true;

    const expiryTime = localStorage.getItem('googleTokenExpiry');
    if (!expiryTime) return true;

    return new Date().getTime() > parseInt(expiryTime);
  }, []);

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

  const generateTemplateVariables = useCallback((formData: TContractForm): TemplateVariables => {
    const formatDate = (dateString: string) => {
      if (!dateString)
        return new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const formatCurrency = (value: string) => {
      if (!value) return '0';
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    // Default payment terms berdasarkan contract type
    const getPaymentTerms = (contractType: TOption | null) => {
      const type = contractType?.value || '';
      switch (type) {
        case 'service':
          return 'Monthly payment, 30 days after invoice';
        case 'procurement':
          return '50% advance, 50% on delivery';
        case 'partnership':
          return 'Quarterly payment';
        case 'maintenance':
          return 'Monthly payment';
        default:
          return 'As per agreement';
      }
    };

    return {
      FIRST_PARTY_NAME: formData.party1?.label || 'PT. POS Indonesia',
      SECOND_PARTY_NAME: formData.party2?.label || '[Nama Perusahaan Partner]',
      SECOND_PARTY_ADDRESS: '[Alamat lengkap perusahaan partner]',
      EFFECTIVE_DATE: formatDate(formData.startDate),
      EXPIRY_DATE: formatDate(formData.endDate),
      CURRENT_DATE: formatDate(''),
      CONTRACT_VALUE: formatCurrency(formData.contractValue),
      CURRENCY: 'Rp',
      PAYMENT_TERMS: getPaymentTerms(formData?.contractType),
      SERVICE_DESCRIPTION: formData.description || '[Deskripsi detail layanan yang akan diberikan]',
      DELIVERY_TIMEFRAME: '[Jangka waktu pengiriman/penyelesaian]',
      PIC_INTERNAL: formData.picInternal?.label || '[Nama PIC Internal]',
      DEPARTMENT: formData.department?.label || '[Nama Department]',
      CONTRACT_TYPE: formData.contractType?.label || '[Tipe Kontrak]',
    };
  }, []);

  const replaceTemplateVariables = useCallback(
    (template: string, variables: TemplateVariables): string => {
      let result = template;
      Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, value);
      });
      return result;
    },
    [],
  );

  const createGoogleDoc = useCallback(async (accessToken: string) => {
    if (!accessToken) return null;

    try {
      console.log('Creating new Google Doc...');
      setIsCreatingDoc(true);
      setAuthError(null);

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
        console.log('Document created successfully:', data.documentId);
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

  const updateGoogleDoc = useCallback(
    async (
      accessToken: string,
      docId: string,
      formData: TContractForm,
      templateType: string = 'standard',
    ) => {
      if (!accessToken || !docId) {
        console.log('Missing accessToken or docId for update');
        return false;
      }

      try {
        console.log('Updating Google Doc:', docId);
        setIsUpdatingDoc(true);
        setAuthError(null);

        // Generate variabel dari form
        console.log(formData);
        const variables = generateTemplateVariables(formData);

        // Ambil template sesuai tipe
        const templateContent = contractTemplates[templateType as keyof typeof contractTemplates];

        // Kalau template tidak ada → fallback
        const processedContent = templateContent
          ? replaceTemplateVariables(templateContent, variables)
          : null;

        // Simple approach: just insert content at the beginning
        const res = await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                insertText: {
                  location: { index: 1 },
                  text: processedContent,
                },
              },
            ],
          }),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to update document: ${res.status} - ${errorText}`);
        }

        const result = await res.json();
        console.log('Document updated successfully:', result);

        hasUpdatedDoc.current = true;
        lastUpdateHash.current = formDataHash;

        return true;
      } catch (error) {
        console.error('Error updating Google Doc:', error);
        // setAuthError(`Failed to update Google Document: ${error.message}`);
        return false;
      } finally {
        setIsUpdatingDoc(false);
      }
    },
    [generateTemplateVariables, replaceTemplateVariables, formDataHash],
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

      // Reset flags
      hasUpdatedDoc.current = false;
      lastUpdateHash.current = '';
    },
    [googleToken, documentId, isTokenExpired, deleteGoogleDoc],
  );

  // Function untuk manual update (bisa dipanggil dari component)
  const manualUpdateDoc = useCallback(async () => {
    if (googleToken && documentId && !isTokenExpired()) {
      console.log('Manual update triggered');
      hasUpdatedDoc.current = false; // Reset flag untuk allow update
      const success = await updateGoogleDoc(googleToken, documentId, formData);
      return success;
    }
    return false;
  }, [googleToken, documentId, isTokenExpired, updateGoogleDoc, formData]);

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

  // Simple parser: convert Docs JSON to plain text
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docToPlainText = useCallback((doc: any) => {
    if (!doc?.body?.content) return '';
    const out: string[] = [];
    for (const element of doc.body.content) {
      if (element.paragraph) {
        const parts: string[] = [];
        for (const elem of element.paragraph.elements || []) {
          if (elem.textRun?.content) parts.push(elem.textRun.content);
        }
        out.push(parts.join(''));
      }
      if (element.table) {
        const rows: string[] = [];
        for (const r of element.table.tableRows || []) {
          const cells: string[] = [];
          for (const c of r.tableCells || []) {
            const cellTexts: string[] = [];
            for (const ce of c.content || []) {
              if (ce.paragraph) {
                const pParts: string[] = [];
                for (const pe of ce.paragraph.elements || []) {
                  if (pe.textRun?.content) pParts.push(pe.textRun.content);
                }
                cellTexts.push(pParts.join(''));
              }
            }
            cells.push(cellTexts.join('\n'));
          }
          rows.push(cells.join('\t'));
        }
        out.push(rows.join('\n'));
      }
    }
    return out.join('\n\n');
  }, []);

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docToHTML = useCallback((doc: any) => {
    if (!doc?.body?.content) return '';
    const escapeHtml = (s: string) =>
      s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTextRun = (elem: any) => {
      const text = elem.textRun?.content ?? '';
      if (!text) return '';
      let out = escapeHtml(text);
      const style = elem.textRun?.textStyle || {};
      if (style.link && style.link.url) {
        out = `<a href="${escapeHtml(style.link.url)}" target="_blank" rel="noopener noreferrer">${out}</a>`;
      }
      if (style.bold) out = `<strong>${out}</strong>`;
      if (style.italic) out = `<em>${out}</em>`;
      if (style.underline) out = `<u>${out}</u>`;
      return out;
    };

    const parts: string[] = [];
    let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
    const flushList = () => {
      if (!currentList) return;
      const tag = currentList.type === 'ol' ? 'ol' : 'ul';
      parts.push(`<${tag}>${currentList.items.map(i => `<li>${i}</li>`).join('')}</${tag}>`);
      currentList = null;
    };

    for (const element of doc.body.content) {
      if (element.table) {
        flushList();
        const rows: string[] = [];
        for (const r of element.table.tableRows || []) {
          const cells: string[] = [];
          for (const c of r.tableCells || []) {
            const cellParts: string[] = [];
            for (const ce of c.content || []) {
              if (ce.paragraph) {
                const pHtml: string[] = [];
                for (const pe of ce.paragraph.elements || []) {
                  pHtml.push(renderTextRun(pe));
                }
                cellParts.push(`<p>${pHtml.join('')}</p>`);
              }
            }
            cells.push(`<td>${cellParts.join('')}</td>`);
          }
          rows.push(`<tr>${cells.join('')}</tr>`);
        }
        parts.push(`<table border="1">${rows.join('')}</table>`);
        continue;
      }

      if (element.paragraph) {
        const p = element.paragraph;
        if (p.bullet) {
          const glyphType = p.bullet?.glyphType || '';
          const listType: 'ul' | 'ol' = /NUMBER|DECIMAL|ROMAN/i.test(glyphType) ? 'ol' : 'ul';
          const itemParts: string[] = [];
          for (const elem of p.elements || []) {
            itemParts.push(renderTextRun(elem));
          }
          if (!currentList) {
            currentList = { type: listType, items: [itemParts.join('')] };
          } else if (currentList.type === listType) {
            currentList.items.push(itemParts.join(''));
          } else {
            flushList();
            currentList = { type: listType, items: [itemParts.join('')] };
          }
          continue;
        }

        flushList();
        const namedStyle = p.paragraphStyle?.namedStyleType || '';
        const inlineParts: string[] = [];
        for (const elem of p.elements || []) {
          inlineParts.push(renderTextRun(elem));
        }
        const innerHtml = inlineParts.join('');
        if (/HEADING_1/.test(namedStyle)) parts.push(`<h1>${innerHtml}</h1>`);
        else if (/HEADING_2/.test(namedStyle)) parts.push(`<h2>${innerHtml}</h2>`);
        else if (/HEADING_3/.test(namedStyle)) parts.push(`<h3>${innerHtml}</h3>`);
        else parts.push(`<p>${innerHtml}</p>`);
      }
    }

    flushList();
    return parts.join('\n');
  }, []);

  const getGoogleDoc = useCallback(
    async (
      accessToken: string,
      docId: string,
      format: 'json' | 'html' | 'text' = 'json',
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
        if (format === 'json') return data;

        // convert JSON to requested format
        if (format === 'html') {
          const html = docToHTML(data);
          return html;
        }

        if (format === 'text') {
          const txt = docToPlainText(data);
          return txt;
        }

        return data;
      } catch (error) {
        console.error('❌ Error fetching Google Doc:', error);
        return null;
      }
    },
    [docToHTML, docToPlainText],
  );

  // Handle document creation - terpisah dari update
  useEffect(() => {
    const createDocumentIfNeeded = async () => {
      if (
        googleToken &&
        !isTokenExpired() &&
        !documentId &&
        !isCreatingDoc &&
        isGoogleScriptLoaded
      ) {
        console.log('Creating document...');
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

  // Handle document update - hanya sekali setelah document dibuat atau ketika form data berubah
  useEffect(() => {
    const updateDocumentIfNeeded = async () => {
      // Cek apakah perlu update:
      // 1. Ada token dan document
      // 2. Belum pernah update ATAU form data berubah
      // 3. Tidak sedang dalam proses create/update
      const shouldUpdate =
        googleToken &&
        !isTokenExpired() &&
        documentId &&
        (!hasUpdatedDoc.current || lastUpdateHash.current !== formDataHash) &&
        !isUpdatingDoc &&
        !isCreatingDoc;

      if (shouldUpdate) {
        console.log(
          'Updating document with form data..., hash changed:',
          lastUpdateHash.current !== formDataHash,
        );
        await updateGoogleDoc(googleToken, documentId, formData);
      }
    };

    updateDocumentIfNeeded();
  }, [
    googleToken,
    documentId,
    formDataHash, // Menggunakan hash instead of formData
    isUpdatingDoc,
    isCreatingDoc,
    isTokenExpired,
    updateGoogleDoc,
    formData,
  ]);

  // Handle initial loading state
  useEffect(() => {
    if (isGoogleScriptLoaded) {
      if (googleToken && isTokenExpired()) {
        clearTokens();
      }
      setIsLoading(false);
    }
  }, [isGoogleScriptLoaded, googleToken, isTokenExpired, clearTokens]);

  return {
    isLoading,
    setIsLoading,
    isCreatingDoc,
    isUpdatingDoc,
    googleToken,
    setGoogleToken,
    getGoogleDoc,
    getAccessToken,
    createGoogleDoc,
    updateGoogleDoc,
    manualUpdateDoc, // Export function untuk manual update
    documentId,
    authError,
    isGoogleScriptLoaded,
    clearTokens,
    deleteGoogleDoc,
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
