import { formatDuration } from 'date-fns';
import { useState } from 'react';
import { StyledDurationPicker } from './styles';

export default function DurationPickers() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(0);

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
}
