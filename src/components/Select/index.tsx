import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CL from 'assets/icons/ratings/RL.png';
import C10 from 'assets/icons/ratings/R10.png';
import C12 from 'assets/icons/ratings/R12.png';
import C14 from 'assets/icons/ratings/R14.png';
import C16 from 'assets/icons/ratings/R16.png';
import C18 from 'assets/icons/ratings/R18.png';
import { IconContainer, Icon } from './styles';

export interface DefaultSelectProps {
  defaultValue: string;
}

const SelectRate: React.FC<DefaultSelectProps> = ({ defaultValue }) => {
  const [rate, setRate] = React.useState('RL');

  React.useEffect(() => {
    setRate(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setRate(event.target.value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const SelectProps = {
    style: {
      backgroundColor: 'var(--color-neutral-6)',
      color: 'var(--color-neutral-3)',
    },
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 370,
        backgroundColor: 'var(--color-neutral-6)',
        color: 'var(--color-neutral-3)',
      },
    },
  };

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
    <div style={{ display: 'inline-block', width: '449px' }}>
      <FormControl sx={{ width: 370 }} size="medium">
        <Select
          SelectDisplayProps={SelectProps}
          MenuProps={MenuProps}
          value={rate}
          onChange={handleChange}
        >
          <MenuItem value="RL">{rates[0]}</MenuItem>
          <MenuItem value="R10">{rates[1]}</MenuItem>
          <MenuItem value="R12">{rates[2]}</MenuItem>
          <MenuItem value="R14">{rates[3]}</MenuItem>
          <MenuItem value="R16">{rates[4]}</MenuItem>
          <MenuItem value="R18">{rates[5]}</MenuItem>
        </Select>
      </FormControl>
      <IconContainer>
        <Icon src={ratings[rate]} alt={rate} />
      </IconContainer>
    </div>
  );
};

export default SelectRate;
