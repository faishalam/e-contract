'use client';
import { StepIconProps } from '@mui/material/StepIcon';
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams, useRouter } from 'next/navigation';
import useImportContract from '../hooks';

// 🔹 Custom Connector
// 🔹 Custom Connector
const CustomStepConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '16px', // ⬅️ setengah tinggi circle (32px / 2)
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: '#1976d2',
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: '#1976d2',
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#e0e0e0',
    borderRadius: 1,
  },
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;
  return (
    <div
      className={`
        flex items-center justify-center 
        w-8 h-8 rounded-full border-2 text-sm
        ${active ? 'border-blue-500 text-blue-500 font-bold' : 'border-gray-300 text-gray-400'}
        ${completed ? 'border-blue-500 bg-blue-500 text-white' : ''}
      `}
    >
      {icon}
    </div>
  );
}

export default function StepperNav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { steps } = useImportContract();

  const currentStep = searchParams.get('step') || steps[0].path;
  const activeStep = steps.findIndex(s => s.path === currentStep);

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<CustomStepConnector />}>
      {steps.map(step => (
        <Step
          key={step.path}
          onClick={() => router.push(`/import?step=${step.path}`)}
          sx={{ cursor: 'pointer' }}
        >
          <StepLabel StepIconComponent={CustomStepIcon}>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
