'use client';
import StepButtons from './components/buttonNav';
import StepperNav from './components/stepperNav';
import MetadataForm from './components/metadataForm';
import useCreateContract from './hooks';
import ContentForm from './components/contentForm';

export default function Page() {
  const { step } = useCreateContract();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        {/* Stepper full width, keluar dari padding */}
        <div className="-mx-6 -my-4 bg-white border-b border-t p-4">
          <StepperNav />
        </div>

        <div className="w-full h-full">
          {step === 'metadata' && <MetadataForm />}
          {step === 'content' && <ContentForm />}

          <StepButtons />
        </div>
      </div>
    </>
  );
}
