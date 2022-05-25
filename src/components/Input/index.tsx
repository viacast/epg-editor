import * as React from 'react';
import { styled } from '@mui/material/styles';
import 'styles/global';
import TextField from '@mui/material/TextField';
import { InputProps } from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Paper } from '@mui/material';

export interface StyledInput {
  disabled: boolean;
  value: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  setValue?: (value: string) => void;
}

const Input = styled(TextField)<InputProps>(() => ({
  width: '270px',
  height: '44px',
  display: 'flex',
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'pointer',
  userSelect: 'none',
  textTransform: 'none',
  fontSize: 20,
  borderRadius: '2px',
  backgroundColor: 'var(--color-neutral-6)',
  fontFamily: 'Nunito, sans-serif',
}));

const MainInput: React.FC<StyledInput> = ({
  disabled,
  value,
  placeholder,
  setValue,
}) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '270px',
        height: '44px',
        marginRight: '12px',
        backgroundColor: 'var(--color-neutral-6)',
      }}
    >
      <Input
        disabled={disabled}
        fullWidth
        value={value}
        placeholder={placeholder}
        inputProps={{
          style: {
            height: '11px',
          },
        }}
        sx={{
          '& .MuiInputBase-root.Mui-disabled': {
            '& > fieldset': {
              borderColor: 'var(--color-neutral-6)',
            },
          },
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'var(--color-neutral-3)',
          },
        }}
      />
      <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
      <IconButton
        sx={{ p: '10px', color: 'var(--color-neutral-3)' }}
        aria-label="directions"
      >
        <CloseIcon onClick={() => setValue?.('')} />
      </IconButton>
    </Paper>
  );
};

export default MainInput;
