import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: var(--color-neutral-5);
  }
`;
export const StyledDialogActions = styled(DialogActions)``;
export const StyledDialogContent = styled(DialogContent)``;
export const StyledDialogContentText = styled(DialogContentText)`
  color: var(--color-neutral-3);
  font-family: Nunito, sans-serif;
  font-size: 16px;
`;
export const StyledDialogTitle = styled(DialogTitle)`
  color: var(--color-neutral-2);
  font-family: Nunito, sans-serif;
  font-size: 24px;
`;
export const StyledButton = styled(Button)`
  color: var(--color-system-4);
`;
