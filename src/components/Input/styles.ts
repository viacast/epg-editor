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

export const StyledInput = styled(TextField)<InputProps>(() => ({
  width: '270px',
  height: '44px',
  display: 'flex',
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'pointer',
  userSelect: 'none',
  textTransform: 'none',
  fontSize: 20,
  borderRadius: '2px',
  backgroundColor: 'var(--color-neutral-6)',
  fontFamily: 'Nunito, sans-serif',
  '& .MuiInputBase-root.Mui-disabled': {
    '& > fieldset': {
      borderColor: 'var(--color-neutral-6)',
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'var(--color-neutral-3)',
  },
}));

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
  margin-right: 12px;
  background-color: var(--color-neutral-6);
`;

export const StyledIconButton = styled(IconButton)<IconProps>`
  padding: 10px;
  color: var(--color-neutral-3);
`;
