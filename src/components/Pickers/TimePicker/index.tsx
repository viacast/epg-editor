import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { StyledInput } from './styles';

export interface ProgramTime {
  time: Date;
  onTimeChange?: (value: Date) => void;
}

const TimePickers: React.FC<ProgramTime> = ({ time, onTimeChange }) => {
  const [value, setValue] = useState<Date>(time);

  useEffect(() => {
    setValue(time);
  }, [time]);

  const dialogStyleProps = {
    sx: {
      span: {
        color: 'var(--color-neutral-3)',
      },
      '& .MuiClockPicker-arrowSwitcher': {
        display: 'none',
        // marginRight: '55px',
      },
      '& .MuiPickersClockNumber': {
        color: 'var(--color-neutral-2)',
      },
      '& .MuiPaper-root': {
        marginRight: '65px',
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
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
        <TimePicker
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          PopperProps={dialogStyleProps}
          InputProps={styleProps}
          value={value}
          onChange={newValue => {
            if (newValue) {
              setValue(newValue);
              onTimeChange?.(newValue);
            }
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

TimePickers.defaultProps = {
  onTimeChange: undefined,
};

export default TimePickers;
