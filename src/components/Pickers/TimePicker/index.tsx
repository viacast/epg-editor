import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
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
      <StaticTimePicker
        ampm={false}
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
        InputProps={styleProps}
        MuiPickerStaticWrapper-root={{
          backgroundColor: 'var(--color-neutral-6)',
        }}
        orientation="landscape"
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
    </LocalizationProvider>
  );
};

TimePickers.defaultProps = {
  onTimeChange: undefined,
};

export default TimePickers;
