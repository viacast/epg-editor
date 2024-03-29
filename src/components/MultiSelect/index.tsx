import React, { useState } from 'react';
import {
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import { ColorPallete } from 'styles/global';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const SelectProps = {
  style: {
    backgroundColor: ColorPallete.NEUTRAL_6,
    color: ColorPallete.NEUTRAL_3,
  },
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 370,
      backgroundColor: ColorPallete.NEUTRAL_6,
      color: ColorPallete.NEUTRAL_3,
    },
  },
};

const names = [
  'Livre (L)',
  'Maiores 10 (dez) anos',
  'Maiores 12 (doze) anos',
  'Maiores 14 (quatorze) anos',
  'Maiores 16 (dezesseis) anos',
  'Maiores 18 (dezoito) anos',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function InputSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ width: 370 }}>
      <Select
        multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={selected => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return selected.join(', ');
        }}
        SelectDisplayProps={SelectProps}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
        {names.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
