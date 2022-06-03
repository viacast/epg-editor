import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Stack from '@mui/material/Stack';
import { StyledInput } from './styles';

export interface ProgramDate {
  programDate: Date | null;
}

const DatePickers: React.FC<ProgramDate> = ({ programDate }) => {
  const [value, setValue] = React.useState(programDate);

  React.useEffect(() => {
    setValue(programDate);
  }, [programDate]);

  const styleProps = {
    style: {
      fontSize: '18px',
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
      width: 210,
      height: 45,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileDatePicker
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          InputProps={styleProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={params => <StyledInput {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePickers;
