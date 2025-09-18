'use client';
import StepperNav from './components/stepperNav';
import StepButtons from './components/buttonNav';
import useImportContract from './hooks';
import SourceStep from './components/sourceStep';
import UploadFile from './components/uploadFileStep';
import VerificationStep from './components/verificationStep';
import InformationStep from './components/informationStep';

export default function ImportContractPage() {
  const { step } = useImportContract();
  return (
    <>
      <div className="w-full h-full flex flex-col gap-6">
        <div className="flex w-full justify-center items-center">
          <div className="max-w-full w-full">
            <StepperNav />
          </div>
        </div>

        {step === 'sumber' && <SourceStep />}
        {step === 'file' && <UploadFile />}
        {step === 'verifikasi' && <VerificationStep />}
        {step === 'selesai' && <InformationStep />}

        <div className="w-full flex justify-center items-center">
          <div className="lg:max-w-6xl md:max-w-lg max-w-sm w-full flex flex-col justify-center gap-6">
            <StepButtons />
          </div>
        </div>
      </div>
    </>
  );
}
