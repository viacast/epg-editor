import React from 'react';
import { Stack } from '@mui/material';
import { ButtonContainer, Icon, Line, Text } from './styles';

export interface ButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <Stack className="epg-button" spacing={2} direction="row">
      <ButtonContainer onClick={onClick} variant="contained">
        <Icon>{icon}</Icon>
        <Line />
        <Text>{text}</Text>
      </ButtonContainer>
    </Stack>
  );
};

Button.defaultProps = {
  onClick: undefined,
};

export default Button;
