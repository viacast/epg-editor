import React from 'react';
import { MenuItem } from '@mui/material';
import CL from 'assets/icons/ratings/RL.svg';
import C10 from 'assets/icons/ratings/R10.svg';
import C12 from 'assets/icons/ratings/R12.svg';
import C14 from 'assets/icons/ratings/R14.svg';
import C16 from 'assets/icons/ratings/R16.svg';
import C18 from 'assets/icons/ratings/R18.svg';
import {
  StyledFormControl,
  StyledSelect,
  IconContainer,
  Icon,
  MenuProps,
} from './styles';

export interface DefaultSelectProps {
  value?: string;
  setValue?: (value: string) => void;
}

const Select: React.FC<DefaultSelectProps> = ({ value = '', setValue }) => {
  const rates = [
    'Livre (L)',
    'Maiores 10 (dez) anos',
    'Maiores 12 (doze) anos',
    'Maiores 14 (quatorze) anos',
    'Maiores 16 (dezesseis) anos',
    'Maiores 18 (dezoito) anos',
  ];

  const ratings = {
    RL: CL,
    R10: C10,
    R12: C12,
    R14: C14,
    R16: C16,
    R18: C18,
  };

  return (
    <div style={{ display: 'inline-block', width: '100%' }}>
      <StyledFormControl size="medium">
        <StyledSelect
          MenuProps={MenuProps}
          value={value}
          onChange={e => {
            setValue?.(e.target.value);
          }}
        >
          <MenuItem value="RL">{rates[0]}</MenuItem>
          <MenuItem value="R10">{rates[1]}</MenuItem>
          <MenuItem value="R12">{rates[2]}</MenuItem>
          <MenuItem value="R14">{rates[3]}</MenuItem>
          <MenuItem value="R16">{rates[4]}</MenuItem>
          <MenuItem value="R18">{rates[5]}</MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <IconContainer>
        <Icon src={ratings[value]} alt={value} />
      </IconContainer>
    </div>
  );
};

Select.defaultProps = {
  value: '',
  setValue: undefined,
};

export default Select;
