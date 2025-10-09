'use client';
import StepButtons from './components/navigation/buttonNav';
import StepperNav from './components/navigation/stepperNav';
import MetadataForm from './components/metadataForm';
import ContentForm from './components/contentForm';
import useCreateContractHooks from './hooks';

export default function Page() {
  const { step, handleSubmit, onSubmit, onInvalid } = useCreateContractHooks();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        {/* Stepper full width, keluar dari padding */}
        <div className="-mx-6 -my-6 bg-white border-b border-t p-4 mb-1">
          <div className="max-w-full w-full">
            <StepperNav />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full h-full">
          {step === 'metadata' && <MetadataForm />}
          {step === 'content' && <ContentForm />}
          {/* {step === 'approval' && <ApprovalForm />} */}
          {/* {step === 'final' && <FinalForm />} */}

          <div className="w-full flex justify-center items-center">
            <div className="lg:max-w-full md:max-w-lg max-w-full w-full flex justify-center">
              <StepButtons />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
