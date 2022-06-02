import React, { useState } from 'react';
import { formatDuration } from 'date-fns';
import { StyledDurationPicker } from './styles';

export interface ProgramDuration {
  programDuration: Date | null;
}

const DurationPickers: React.FC<ProgramDuration> = ({ programDuration }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(0);

  React.useEffect(() => {
    setValue(programDuration);
  }, [programDuration]);

  return (
    <div>
      <StyledDurationPicker
        placeholder="00:00:00"
        value={value}
        onValueChange={v => {
          setValue(v);
        }}
        formatDuration={formatDuration}
      />
    </div>
  );
};

export default DurationPickers;
