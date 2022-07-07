import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import { ptBR, es, enUS } from 'date-fns/locale';
import { StyledInput } from './styles';

export interface ProgramDate {
  date: Date;
  onDateChange?: (value: Date) => void;
}

const DatePickers: React.FC<ProgramDate> = ({ date, onDateChange }) => {
  const [value, setValue] = useState(date);
  const aux = localStorage.getItem('i18nextLng');
  let lang;

  if (aux) {
    if (aux === 'pt') lang = ptBR;
    else if (aux === 'en') lang = enUS;
    else lang = es;
  }

  useEffect(() => {
    setValue(date);
  }, [date]);

  const dialogStyleProps = {
    sx: {
      span: {
        color: 'var(--color-neutral-3)',
      },
      '& .MuiPaper-root': {
        marginLeft: '164px',
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
        overflow: 'hidden',
      },
      '& .MuiButtonBase-root': {
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
      },
      '& .PrivatePickersSlideTransition-root': {
        color: 'var(--color-neutral-2)',
      },
    },
  };

  const inputStyleProps = {
    sx: {
      '& .MuiSvgIcon-root': {
        color: 'var(--color-neutral-5)',
      },
    },
    style: {
      fontSize: '18px',
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
      width: '100%',
      height: 45,
    },
  };

  return (
    <LocalizationProvider adapterLocale={lang} dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DatePicker
          PopperProps={dialogStyleProps}
          onChange={newValue => {
            if (newValue) {
              setValue(newValue);
              onDateChange?.(newValue);
            }
          }}
          value={value}
          InputProps={inputStyleProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={params => <StyledInput {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

DatePickers.defaultProps = {
  onDateChange: undefined,
};

export default DatePickers;
