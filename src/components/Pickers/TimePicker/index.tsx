import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StyledInput } from './styles';

export interface ProgramTime {
  programTime: Date | null;
}

const TimePickers: React.FC<ProgramTime> = ({ programTime }) => {
  const [value, setValue] = React.useState<Date | null>(programTime);

  React.useEffect(() => {
    setValue(programTime);
  }, [programTime]);

  const dialogStyleProps = {
    sx: {
      '& .MuiPickersArrowSwitcher-root': {
        right: '85px',
      },
      '& .MuiPickersClockNumber': {
        color: 'var(--color-neutral-2)',
      },
      '& .MuiPaper-root': {
        marginRight: '65px',
        paddingTop: '20px',
        width: '442px',
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
        overflow: 'hidden',
      },
      '& .MuiButtonBase-root': {
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
      },
      '& .MuiTypography-root': {
        color: 'var(--color-neutral-2)',
      },
    },
  };

  const styleProps = {
    sx: {
      '& .MuiSvgIcon-root': {
        color: 'var(--color-neutral-5)',
      },
    },
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
        <DesktopTimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          PopperProps={dialogStyleProps}
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
