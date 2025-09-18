'use client';
import { IconButton, IconButtonProps } from '@mui/material';
import { useId } from 'react';

type TProps = IconButtonProps & {
  children?: React.ReactNode;
};

const CIconButton: React.FC<TProps> = ({ children, ...props }) => {
  const reactId = useId(); // SSR-safe ID
  const id = props.id || `custom-icon-button-${reactId}`;
  const ariaLabel = props['aria-label'] || `custom-icon-button-${reactId}`;
  const title = props.title || `custom-icon-button-${reactId}`;
  const ariaLabelledBy = props['aria-labelledby'] || `custom-icon-button-${reactId}`;
  const role = props.role || 'button';

  return (
    <IconButton
      {...props}
      id={id}
      aria-label={ariaLabel}
      title={title}
      aria-labelledby={ariaLabelledBy}
      role={role}
      size={props.size}
    >
      {children}
    </IconButton>
  );
};
export default CIconButton;
