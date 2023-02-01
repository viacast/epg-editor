import React from 'react';
import { MenuItem } from '@mui/material';
import { StyledFormControl, StyledSelect, MenuProps } from './styles';

interface SelectOption {
  label: string;
  value: string;
}
export interface DefaultSelectProps {
  value?: string;
  setValue?: (value: string) => void;
  options: SelectOption[];
  width: string;
}

const Select: React.FC<DefaultSelectProps> = ({
  value = '',
  setValue,
  options,
  width,
}) => {
  return (
    <StyledFormControl size="medium" style={{ width }}>
      <StyledSelect
        MenuProps={MenuProps}
        value={value}
        onChange={e => {
          setValue?.(e.target.value);
        }}
      >
        {options.map(({ label, value: optionValue }) => (
          <MenuItem key={optionValue} value={optionValue}>
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

Select.defaultProps = {
  value: '',
  setValue: undefined,
};

export default Select;
