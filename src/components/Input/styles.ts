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

export interface PaperStylesProps extends PaperProps {
  width: string;
  height: string;
}

export const StyledInput = styled(TextField)<InputProps>`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  vertical-align: middle;
  text-transform: none;
  font-size: 20;
  border-radius: 2px;
  background-color: var(--color-neutral-6);

  .MuiOutlinedInput-root,
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
    &:hover fieldset {
      border-color: var(--color-neutral-6);
    }
    &.Mui-focused fieldset {
      border-color: var(--color-neutral-6);
    }
  }

  .MuiOutlinedInput-input,
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
export const StyledPaper = styled(Paper)<PaperStylesProps>`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: width;
  height: height;
  background-color: var(--color-neutral-6);
`;

export const StyledIconButton = styled(IconButton)<IconProps>`
  padding: 10px;
  color: var(--color-neutral-3);
`;
