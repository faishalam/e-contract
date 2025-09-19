'use client';
import StepButtons from './components/navigation/buttonNav';
import StepperNav from './components/navigation/stepperNav';
import MetadataForm from './components/metadataForm';
import useCreateContract from './hooks';
import ContentForm from './components/contentForm';
import ApprovalForm from './components/approvalForm';
import FinalForm from './components/finalForm';

export default function Page() {
  const { step } = useCreateContract();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        {/* Stepper full width, keluar dari padding */}
        <div className="-mx-6 -my-4 bg-white border-b border-t p-4 mb-1">
          <div className="max-w-full w-full">
            <StepperNav />
          </div>
        </div>

        <div className="w-full h-full">
          {step === 'metadata' && <MetadataForm />}
          {step === 'content' && <ContentForm />}
          {step === 'approval' && <ApprovalForm />}
          {step === 'final' && <FinalForm />}

          <div className="w-full flex justify-center items-center mt-5">
            <div className="md:max-w-full max-w-sm w-full flex flex-col justify-center gap-6">
              <StepButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
