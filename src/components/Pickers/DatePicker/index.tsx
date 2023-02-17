import React, { useState, useEffect, useRef } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  DatePicker as MUIDatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import Stack from '@mui/material/Stack';
import { ptBR, es, enUS } from 'date-fns/locale';

import i18n from 'services/i18n';
import { ColorPallete } from 'styles/global';
import useClickOutside from 'hooks/useClickOutside';
import { useDebounce } from 'hooks/index';
import { StyledInput } from './styles';

export interface DatePickerProps {
  date: Date;
  onDateChange?: (value: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
  const [value, setValue] = useState(date);
  const [open, setOpen] = useState(false);
  const ConfigurationsRef = useRef<HTMLDivElement>(null);
  const aux = i18n.resolvedLanguage;
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
        color: ColorPallete.NEUTRAL_3,
      },
      '& .MuiPaper-root': {
        marginLeft: '164px',
        backgroundColor: ColorPallete.NEUTRAL_6,
        color: ColorPallete.NEUTRAL_2,
        overflow: 'hidden',
      },
      '& .MuiButtonBase-root': {
        backgroundColor: ColorPallete.NEUTRAL_6,
        color: ColorPallete.NEUTRAL_2,
      },
      '& .PrivatePickersSlideTransition-root': {
        color: ColorPallete.NEUTRAL_2,
      },
    },
  };

  const inputStyleProps = {
    sx: {
      '& .MuiSvgIcon-root': {
        color: ColorPallete.NEUTRAL_5,
      },
    },
    style: {
      fontSize: '18px',
      backgroundColor: ColorPallete.NEUTRAL_6,
      color: ColorPallete.NEUTRAL_3,
      width: '100%',
      height: 45,
    },
  };

  useDebounce(
    useClickOutside(ConfigurationsRef, () => setOpen(false)),
    1000,
  );

  return (
    <LocalizationProvider adapterLocale={lang} dateAdapter={AdapterDateFns}>
      <Stack
        spacing={3}
        ref={ConfigurationsRef}
        onClick={() => setOpen(p => !p)}
      >
        <MUIDatePicker
          open={open}
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

DatePicker.defaultProps = {
  onDateChange: undefined,
};

export default DatePicker;
