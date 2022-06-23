import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { addHours, format } from 'date-fns';
import { StyledInput } from './styles';

export interface ProgramTime {
  duration?: number;
  onDurationChange?: (value: Date) => void;
  setDuration?: (value: number) => void;
}

const DurationPickers: React.FC<ProgramTime> = ({
  duration,
  onDurationChange,
  setDuration,
}) => {
  const [dValue, setdValue] = useState<Date>(
    duration ? new Date(duration * 1000) : new Date(),
  );

  const sum = addHours(dValue, 3);
  const leng = format(sum, 'HH:mm:ss');
  const d = new Date();
  d.setHours(
    Number(leng.slice(0, 2)),
    Number(leng.slice(3, 5)),
    Number(leng.slice(6, 8)),
  );

  useEffect(() => {
    if (duration) {
      setdValue(new Date(duration * 1000));
      setDuration?.(duration);
    }
  }, [setDuration, duration]);

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
        value={d}
        onChange={newValue => {
          if (newValue) {
            if (typeof newValue === 'number') {
              setdValue?.(new Date(newValue * 1000));
              const num = newValue;
              let hours = 0;
              let minutes = Math.floor(num / 60);
              if (minutes >= 60) {
                hours = Math.floor(minutes / 60);
                minutes %= 60;
              }
              const seconds = num % 60;
              const l = new Date();
              l.setHours(hours, minutes, seconds);
              onDurationChange?.(l);
            }
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

DurationPickers.defaultProps = {
  duration: 0,
  onDurationChange: undefined,
  setDuration: undefined,
};

export default DurationPickers;
