import {
  FormControl,
  FormControlProps,
  Select,
  SelectProps,
  styled as muistyled,
} from '@mui/material';

import { ColorPallete } from 'styles/global';

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '200px',
      backgroundColor: ColorPallete.NEUTRAL_6,
      color: ColorPallete.NEUTRAL_3,
    },
  },
};

export const StyledFormControl = muistyled(FormControl)<FormControlProps>``;

export const StyledSelect = muistyled(Select)<SelectProps<string>>`
  background-color: var(--color-neutral-6);
  color: var(--color-neutral-3);

  .MuiSvgIcon-root {
    color: var(--color-neutral-5);
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
