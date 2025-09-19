'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import useCreateContract from '../../hooks';

export default function StepButtons() {
  const { steps } = useCreateContract();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get('step') || steps[0].path;
  const currentIndex = steps.findIndex(s => s.path === currentStep);

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].path;
      router.push(`/contract-management/create?step=${nextStep}`);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevStep = steps[currentIndex - 1].path;
      router.push(`/contract-management/create?step=${prevStep}`);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center">
      {/* Kiri: Simpan Draft */}
      <div className="w-full md:mb-4">
        <Button
          variant="contained"
          className="!bg-[#f9fafb] w-60 !border !text-black !capitalize !shadow-sm"
        >
          Simpan sebagai Draft
        </Button>
      </div>

      {/* Kanan: Back / Next */}
      <div className="w-full flex-col md:flex-row justify-center items-center flex md:justify-end md:items-center gap-4">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          variant="contained"
          className="!bg-[#f9fafb] w-60 !border !text-black !capitalize !shadow-sm disabled:!opacity-50"
        >
          Batal
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          variant="contained"
          className="!capitalize w-60 !shadow-sm disabled:!opacity-50"
        >
          {currentIndex === steps.length - 1
            ? 'Selesai'
            : 'Lanjut ke ' + steps[currentIndex + 1].label}
        </Button>
      </div>
    </div>
  );
}
