import React from 'react';
import Stack from '@mui/material/Stack';
import { ButtonContainer } from './styles';

export interface ButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <Stack className="epg-button" spacing={2} direction="row">
      <ButtonContainer onClick={onClick} variant="contained">
        <div className="icon">{icon}</div>
        <div className="line" />
        <div className="text">{text}</div>
      </ButtonContainer>
    </Stack>
  );
};

Button.defaultProps = {
  onClick: undefined,
};

export default Button;
