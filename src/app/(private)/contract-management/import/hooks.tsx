'use client';

import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const useImportContractHooks = () => {
  const [stepNav, setStepNav] = useState<string>('');
  const steps = [
    { label: 'Pilih Sumber', path: 'sumber' },
    { label: 'Unggah File', path: 'file' },
    { label: 'Verifikasi', path: 'verifikasi' },
    { label: 'Selesai', path: 'selesai' },
  ];
  const paramsStep = useSearchParams();
  const step = paramsStep.get('step') || 'metadata';
  return {
    stepNav,
    setStepNav,
    steps,
    paramsStep,
    step,
  };
};

const ImportContractContext = createContext<ReturnType<typeof useImportContractHooks> | undefined>(
  undefined,
);

export const ImportContractProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useImportContractHooks();
  return <ImportContractContext.Provider value={value}>{children}</ImportContractContext.Provider>;
};

export const useImportContract = () => {
  const context = useContext(ImportContractContext);
  if (context === undefined) {
    throw new Error('ImportContractContext must be used within an ImportContractProvider');
  }
  return context;
};
export default useImportContract;
