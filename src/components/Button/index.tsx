import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import 'styles/global';

export interface StyledButton {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const IconButton = styled(Button)<ButtonProps>(() => ({
  width: '139px',
  height: '44px',
  display: 'flex',
  textAlign: 'center',
  border: '2px solid var(--color-neutral-3)',
  cursor: 'pointer',
  textTransform: 'none',
  transition: 'none',
  lineHeight: 1,
  borderRadius: '2px',
  color: 'var(--color-neutral-3)',
  backgroundColor: 'transparent',
  '.icon': {
    paddingLeft: '8.6331%',
    margin: 'auto 0',
  },
  '.text': {
    marginRight: '14.3885%',
    marginLeft: '14.3885%',
  },
  '.line': {
    width: '2px',
    height: '20px',
    marginLeft: '9.3525%',
    borderLeft: '2px solid var(--color-neutral-3)',
  },
  '&:hover': {
    color: 'var(--color-neutral-2)',
    borderColor: 'var(--color-neutral-2)',
    backgroundColor: 'transparent',
    '.line': {
      borderColor: 'var(--color-neutral-2)',
    },
  },
}));

const BaseButton: React.FC<StyledButton> = ({ text, icon, onClick }) => {
  return (
    <Stack spacing={2} direction="row" width="139px">
      <IconButton onClick={onClick} variant="contained">
        <div className="icon">{icon}</div>
        <div className="line" />
        <div className="text">{text}</div>
      </IconButton>
    </Stack>
  );
};

BaseButton.defaultProps = {
  onClick: undefined,
};

export default BaseButton;
