import { TextField, styled } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';

export const StyledStaticTimePicker = styled(StaticTimePicker)`
  .MuiPickerStaticWrapper-content {
    background-color: transparent;
    color: var(--color-neutral-3);
  }
  span,
  button {
    color: var(--color-neutral-3);
  }
`;

export const StyledInput = styled(TextField)`
  .MuiOutlinedInput-root,
  .MuiOutlinedInput-root.Mui-disabled {
    & > input {
      height: 16px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      padding-top: 22.5px;
    }
    & > fieldset {
      border: none;
    }
  }
`;
