import { Select, SelectProps, styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const StyledSelect = styled(Select)<SelectProps>`
  .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    color: var(--color-neutral-3);
  }
`;
