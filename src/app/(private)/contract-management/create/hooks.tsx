'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GestureIcon from '@mui/icons-material/Gesture';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import DescriptionIcon from '@mui/icons-material/Description';
import { useParams, useSearchParams } from 'next/navigation';
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

  return { stepNav, setStepNav, steps, paramsStep, step };
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
