import React from 'react';
import Button from '@mui/material/Button';

export interface PrettyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const PrettyButton: React.FC<PrettyButtonProps> = ({ children, onClick }) => {
  return <Button variant="contained" color="primary" onClick={onClick}>{children}</Button>;
};