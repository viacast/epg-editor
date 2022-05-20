import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import 'styles/global';
import TextField from '@mui/material/TextField';
import { InputProps } from '@mui/material/Input';
import Box from '@mui/material/Box';

const Input = styled(TextField)<InputProps>(() => ({
  width: '270px',
  height: '44px',
  display: 'flex',
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'pointer',
  textTransform: 'none',
  fontSize: 20,
  borderRadius: '2px',
  backgroundColor: 'var(--color-neutral-6)',
  fontFamily: 'Nunito, sans-serif',
}));

const MainInput: React.FC = () => {
  return (
    <Stack spacing={2} direction="row" width="270px" marginRight="1.337793%">
      <Box>
        <Input
          disabled
          fullWidth
          inputProps={{
            value: 'EPG.CSV',
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
      </Box>
    </Stack>
  );
};

export default MainInput;
