import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { StyledInput } from './styles';

export interface ProgramTime {
  time: Date;
  onTimeChange?: (value: Date) => void;
  setTime?: (value: Date) => void;
}

const TimePickers: React.FC<ProgramTime> = ({
  time,
  onTimeChange,
  setTime,
}) => {
  const [tValue, settValue] = useState<Date>(time);

  useEffect(() => {
    if (time) {
      settValue(time);
      setTime?.(time);
    }
  }, [setTime, time]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        ampm={false}
        displayStaticWrapperAs="mobile"
        orientation="landscape"
        openTo="hours"
        views={['hours', 'minutes', 'seconds']}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
        value={tValue}
        onChange={newValue => {
          if (newValue) {
            settValue?.(newValue);
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
  setTime: undefined,
};

export default TimePickers;
