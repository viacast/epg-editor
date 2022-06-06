import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import { StyledInput } from './styles';

export interface ProgramDate {
  programDate: Date | null;
}

const DatePickers: React.FC<ProgramDate> = ({ programDate }) => {
  const [value, setValue] = React.useState(programDate);

  React.useEffect(() => {
    setValue(programDate);
  }, [programDate]);

  const dialogStyleProps = {
    sx: {
      '& .MuiPaper-root': {
        marginLeft: '164px',
        paddingTop: '20px',
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
        overflow: 'hidden',
      },
      '& .MuiButtonBase-root': {
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-2)',
      },
      '& .MuiTypography-root': {
        color: 'var(--color-neutral-2)',
      },
    },
  };

  const inputStyleProps = {
    style: {
      fontSize: '18px',
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
      width: '100%',
      height: 45,
      '& .MuiButtonBase-root': {
        color: 'var(--color-neutral-3)',
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          PopperProps={dialogStyleProps}
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          InputProps={inputStyleProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={params => <StyledInput {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePickers;
