import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { StyledInput } from './styles';

export interface ProgramTime {
  duration: number;
  onDurationChange?: (value: number) => void;
  setDuration: (value: number) => void;
}

const DurationPickers: React.FC<ProgramTime> = ({
  duration,
  onDurationChange,
}) => {
  const [value, setValue] = useState<Date>(new Date());

  useEffect(() => {
    const date = new Date();
    date.setHours(Math.floor(duration / 3600));
    date.setMinutes(Math.floor((duration % 3600) / 60));
    date.setSeconds((duration % 3600) % 60);
    setValue(date);
  }, [duration]);

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
        value={value}
        onChange={newValue => {
          if (!newValue) {
            return;
          }
          setValue?.(newValue);
          let newDuration = 0;
          newDuration += newValue.getSeconds();
          newDuration += newValue.getMinutes() * 60;
          newDuration += newValue.getHours() * 3600;
          onDurationChange?.(newDuration);
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
  onDurationChange: undefined,
};

export default DurationPickers;
