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
  width?: string;
  height?: string;
}

export const StyledInput = styled(TextField)<InputProps>`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  vertical-align: middle;
  text-transform: none;
  font-size: 20px;
  border-radius: 2px;
  background-color: var(--color-neutral-6);

  .MuiOutlinedInput-root,
  .MuiOutlinedInput-root.Mui-disabled {
    & > input {
      height: 9px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > fieldset {
      border: none;
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
  box-shadow: unset;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '44px'};
  background-color: var(--color-neutral-6);
  .MuiFormControl #text {
    width: 5px;
    height: 10px;
  }
  .MuiPaper-root {
    box-shadow: none;
  }
`;

export const StyledIconButton = styled(IconButton)<IconProps>`
  padding: 10px;
  color: var(--color-neutral-3);
`;
