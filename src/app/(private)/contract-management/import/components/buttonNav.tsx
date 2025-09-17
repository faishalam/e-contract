'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import useImportContract from '../hooks';

export default function StepButtons() {
  const { steps } = useImportContract();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get('step') || steps[0].path;
  const currentIndex = steps.findIndex(s => s.path === currentStep);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].path;
      router.push(`/contract-management/import?step=${nextStep}`);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1].path;
      router.push(`/contract-management/import?step=${prevStep}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex justify-end items-center gap-4">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          variant="contained"
          className="!bg-[#f9fafb] w-20 !border !text-black !capitalize !shadow-sm disabled:!opacity-50"
        >
          Batal
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          variant="contained"
          className="!capitalize w-50 !shadow-sm disabled:!opacity-50"
        >
          {currentIndex === steps.length - 1
            ? 'Selesai'
            : 'Lanjut ke ' + steps[currentIndex + 1].label}
        </Button>
      </div>
    </div>
  );
}
