import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { HelpContainer, StyledInput } from './styles';

export interface TimePickerProps {
  time: Date;
  onTimeChange?: (value: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ time, onTimeChange }) => {
  const [value, setValue] = useState<Date>(time);
  const digitalClock =
    document.getElementsByClassName('MuiClockPicker-root')[0] === undefined;

  useEffect(() => {
    setValue(time);
  }, [time]);

  return (
    <HelpContainer state={digitalClock}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          ampm={false}
          displayStaticWrapperAs="mobile"
          orientation="landscape"
          toolbarTitle=""
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          value={value}
          onChange={newValue => {
            if (newValue) {
              setValue?.(newValue);
              onTimeChange?.(newValue);
            }
          }}
          renderInput={params => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <StyledInput {...params} />
          )}
        />
      </LocalizationProvider>
    </HelpContainer>
  );
};

TimePicker.defaultProps = {
  onTimeChange: undefined,
};

export default TimePicker;
