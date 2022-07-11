import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, StaticTimePicker } from '@mui/x-date-pickers';
import { StyledInput, HelpContainer } from './styles';

export interface DurationPickerProps {
  duration: number;
  onDurationChange?: (value: number) => void;
  setDuration: (value: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
  duration,
  onDurationChange,
}) => {
  const [value, setValue] = useState<Date>(new Date());
  const [pageHeight, setPageHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setPageHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    const date = new Date();
    date.setHours(Math.floor(duration / 3600));
    date.setMinutes(Math.floor((duration % 3600) / 60));
    date.setSeconds((duration % 3600) % 60);
    setValue(date);
  }, [duration]);

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
    </HelpContainer>
  );
};

DurationPicker.defaultProps = {
  onDurationChange: undefined,
};

export default DurationPicker;
