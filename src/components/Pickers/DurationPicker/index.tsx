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
        DurationDialogProps={{
          style: {
            top: '600px',
            left: 'calc(100% - 536px)',
            width: '502px',
            // '& .MuiInputBase-input': {
            //   color: 'var(--color-neutral-3)',
            // },
            // '& .MuiDialog-paper': {
            //   transform: 'scale(0.8)',
            //   backgroundColor: 'var(--color-neutral-5)',
            // },
            // '& .MuiToolbar-root': {
            //   backgroundColor: 'var(--color-neutral-5)',
            // },
            // '& .MuiDialog-paperWidthSm': {
            // },
          },
        }}
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
