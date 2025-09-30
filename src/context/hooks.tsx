'use client';

import { createContext, useContext } from 'react';
import useUserProfile from '@/services/auth/profile';

const useAuthHooks = () => {
  const { data: dataProfile, isPending: isLoadingDataProfile } = useUserProfile();

  return {
    dataProfile,
    isLoadingDataProfile,
  };
};

const AuthContext = createContext<ReturnType<typeof useAuthHooks> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAuthHooks();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export default useAuth;
