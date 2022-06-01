import {
  Divider,
  DividerProps,
  IconButton,
  IconProps,
  Paper,
  PaperProps,
  TextField,
  InputProps,
  styled,
} from '@mui/material';

export const StyledInput = styled(TextField)<InputProps>`
  width: 270px;
  height: 44px;
  display: flex;
  text-align: center;
  vertical-align: middle;
  text-transform: none;
  font-size: 20;
  border-radius: 2px;
  background-color: var(--color-neutral-6);

  .MuiOutlinedInput-root.Mui-disabled {
    & > input {
      height: 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > fieldset {
      border-color: var(--color-neutral-6);
    }
  }

  .MuiOutlinedInput-input.Mui-disabled {
    -webkit-text-fill-color: var(--color-neutral-3);
  }
`;

export const StyledDivider = styled(Divider)<DividerProps>`
  height: 28px;
  width: 1px;
  margin: 8px;
  border-right-width: 1px;
`;
export const StyledPaper = styled(Paper)<PaperProps>`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 270px;
  height: 44px;
  background-color: var(--color-neutral-6);
`;

export const StyledIconButton = styled(IconButton)<IconProps>`
  padding: 10px;
  color: var(--color-neutral-3);
`;
