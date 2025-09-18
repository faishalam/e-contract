import { StepIconProps } from '@mui/material/StepIcon';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const stepIcons: { [index: string]: React.ElementType } = {
    1: DescriptionIcon,
    2: EditIcon,
    3: VerifiedUserIcon,
    4: DoneAllIcon,
  };

  const IconComponent = stepIcons[String(icon)];

  return (
    <div
      style={{
        backgroundColor: active || completed ? '#1976d2' : '#e0e0e0',
        color: active || completed ? 'white' : '#9e9e9e',
        borderRadius: '50%',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <IconComponent />
    </div>
  );
}
