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
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    setValue(time);
  }, [time]);

  return (
    <HelpContainer marginTop={pageHeight <= 970 ? '-368px' : '-40px'}>
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
