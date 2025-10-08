'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import useCreateContract from '../../hooks';
import { toast } from 'react-toastify';
import { TContractForm } from '../../validator';

export default function StepButtons() {
  const { steps, trigger } = useCreateContract();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStep = searchParams.get('step') || steps[0].path;
  const currentIndex = steps.findIndex(s => s.path === currentStep);

  const stepFields: Record<string, (keyof TContractForm)[]> = {
    metadata: [
      'title',
      'party1',
      'party2',
      'contractType',
      'contractValue',
      'startDate',
      'endDate',
      'picInternal',
      'department',
    ],
    content: [], // isi kalau ada field di step "content"
    approval: [], // isi sesuai kebutuhan
    final: [], // biasanya kosong
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep] || [];
    if (fieldsToValidate.length > 0) {
      const valid = await trigger(fieldsToValidate as (keyof TContractForm)[]);
      if (!valid) {
        toast.error('Lengkapi form sebelum lanjut!');
        return;
      }
    }

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
          className="!bg-[#f9fafb] w-50 !border !text-black !capitalize !shadow-sm disabled:!opacity-50"
        >
          Batal
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === steps.length - 1}
          variant="contained"
          className="!capitalize w-50 !shadow-sm disabled:!opacity-50"
          color="secondary"
        >
          {currentIndex === steps.length - 1
            ? 'Selesai'
            : 'Lanjut ke ' + steps[currentIndex + 1].label}
        </Button>
      </div>
    </div>
  );
}
