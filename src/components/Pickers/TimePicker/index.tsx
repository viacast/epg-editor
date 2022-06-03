import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { StyledInput } from './styles';

export interface ProgramTime {
  programTime: Date | null;
}

const TimePickers: React.FC<ProgramTime> = ({ programTime }) => {
  const [value, setValue] = React.useState<Date | null>(programTime);

  React.useEffect(() => {
    setValue(programTime);
  }, [programTime]);

  const styleProps = {
    style: {
      fontSize: '18px',
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
      width: '100%',
      height: 45,
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <MobileTimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          InputProps={styleProps}
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          renderInput={params => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledInput {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default TimePickers;
