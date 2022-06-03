import { styled } from '@mui/material/styles';
import {
  DurationPicker,
  DurationPickerProps,
} from 'material-duration-picker/dist/durationPicker';

// eslint-disable-next-line import/prefer-default-export
export const StyledDurationPicker = styled(DurationPicker)<DurationPickerProps>`
  background-color: var(--color-neutral-6);
  width: 210px;
  height: 44px;
  border-radius: 4px;
  vertical-align: middle;
  padding: 8px 16px 7px;

  .MuiToolbar-regular {
    height: 16px;
  }
  .MuiInputBase-root {
    color: var(--color-neutral-4);
  }
  .MuiInputBase-root:hover {
    & > input {
      z-index: 2;
      border-bottom: 2px solid var(--color-neutral-6);
    }
  }
  .MuiInput-underline::before {
    border-bottom: 1px solid transparent;
    transition: none;
  }
  .MuiInput-underline::after {
    border-bottom: 1px solid transparent;
    transition: none;
  }
`;
