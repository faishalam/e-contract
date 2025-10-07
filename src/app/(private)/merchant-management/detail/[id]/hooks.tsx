'use client';

import { createContext, useContext, useState } from 'react';

const useDetailMerchantValue = () => {
  const [activeTab, setActiveTab] = useState<string>('Template Merchant');

  return {
    activeTab,
    setActiveTab,
  };
};

const DetailMerchantContext = createContext<ReturnType<typeof useDetailMerchantValue> | undefined>(
  undefined,
);

export const DetailMerchantProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = useDetailMerchantValue();
  return <DetailMerchantContext.Provider value={value}>{children}</DetailMerchantContext.Provider>;
};

export const useMerchantDetail = () => {
  const context = useContext(DetailMerchantContext);
  if (context === undefined) {
    throw new Error('DetailMerchantContext must be used within an DetailMerchantProvider');
  }
  return context;
};
export default useMerchantDetail;
