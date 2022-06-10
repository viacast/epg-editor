import { styled } from '@mui/material/styles';
import {
  DurationPicker,
  DurationPickerProps,
} from 'material-duration-picker/dist/durationPicker';
import { ptBR, es, enUS } from 'date-fns/locale';

export { ptBR, es, enUS };

export const StyledDurationPicker = styled(DurationPicker)<DurationPickerProps>`
  background-color: var(--color-neutral-6);
  width: 100%;
  height: 44px;
  border-radius: 4px;
  vertical-align: middle;
  padding: 8px 16px 7px;

  .MuiInputBase-root {
    color: var(--color-neutral-3);
  }
  .MuiInputBase-input {
    text-align: center;
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
