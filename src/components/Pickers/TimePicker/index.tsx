import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export default function ResponsiveTimePickers() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const styleProps = {
    style: {
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
      width: 200,
      height: 45,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileTimePicker
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          InputProps={styleProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={params => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
