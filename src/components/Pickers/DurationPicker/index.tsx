import React, { useState, useEffect } from 'react';
import { formatDuration } from 'date-fns';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { ptBR, es, enUS, StyledDurationPicker } from './styles';

const labelsPt = {
  cancel: 'Cancelar',
  ok: 'Salvar',
  weeks: 'Semanas',
  days: 'Dias',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

const labelsEs = {
  cancel: 'Cancelar',
  ok: 'Acceptar',
  weeks: 'Semanas',
  days: 'Días',
  hours: 'Horas',
  minutes: 'Minutos',
  seconds: 'Segundos',
};

const labelsEn = {
  cancel: 'Cancel',
  ok: 'Save',
  weeks: 'Weeks',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
};

const materialTheme = createTheme({
  palette: {
    primary: {
      main: '#808080',
      contrastText: '#1d2024',
    },
  },
});

const aux = localStorage.getItem('i18nextLng');
let lang;
let labelLang;

if (aux) {
  if (aux === 'pt') {
    lang = ptBR;
    labelLang = labelsPt;
  } else if (aux === 'es') {
    lang = es;
    labelLang = labelsEs;
  } else {
    lang = enUS;
    labelLang = labelsEn;
  }
}

export interface ProgramDuration {
  duration: number;
  onDurationChange?: (value: number) => void;
}

const DurationPickers: React.FC<ProgramDuration> = ({
  duration,
  onDurationChange,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(0);

  useEffect(() => {
    setValue(duration);
  }, [duration]);

  return (
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
          labels: labelLang,
          DurationFieldsContainerProps: {
            labels: labelLang,
          },
          BackdropProps: {
            style: {
              backgroundColor: 'transparent',
            },
          },
        }}
        value={value}
        onValueChange={newValue => {
          if (newValue) {
            setValue(newValue);
            onDurationChange?.(newValue);
          }
        }}
        formatDuration={d =>
          formatDuration(d, {
            locale: lang,
          })
        }
      />
    </ThemeProvider>
  );
};

DurationPickers.defaultProps = {
  onDurationChange: undefined,
};

export default DurationPickers;
