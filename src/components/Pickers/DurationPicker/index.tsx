import React, { useState } from 'react';
import { formatDuration } from 'date-fns';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { StyledDurationPicker } from './styles';

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#808080',
      contrastText: '#1d2024',
    },
  },
});

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
      <ThemeProvider theme={materialTheme}>
        <StyledDurationPicker
          DurationDialogProps={{
            style: {
              top: '600px',
              left: 'calc(100% - 536px)',
              width: '502px',
            },
            PaperProps: {
              style: {
                backgroundColor: 'var(--color-neutral-6)',
                boxShadow: 'none',
              },
              inputMode: 'text',
            },
            BackdropProps: {
              style: {
                backgroundColor: 'transparent',
              },
            },
          }}
          placeholder="00:00:00"
          value={value}
          onValueChange={v => {
            setValue(v);
          }}
          formatDuration={formatDuration}
        />
      </ThemeProvider>
    </div>
  );
};

export default DurationPickers;
