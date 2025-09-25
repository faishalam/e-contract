import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
  }
}

export function useGoogleAuth(onSuccess: (token: string) => void) {
  useEffect(() => {
    const init = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: (response: any) => {
          // response.credential = JWT dari Google
          onSuccess(response.credential);
        },
      });
    };

    // load script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = init;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess]);
}
