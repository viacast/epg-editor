import { TextField, styled as muistyled } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';
import styled from 'styled-components';

export const StyledStaticTimePicker = muistyled(StaticTimePicker)`
  .MuiPickerStaticWrapper-content {
    background-color: transparent;
    color: var(--color-neutral-3);
  }
  span,
  button {
    color: var(--color-neutral-3);
  }
`;

export const StyledInput = muistyled(TextField)`
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

export const HelpContainer = styled.div<{ marginTop: string }>`
  position: absolute;
  background: var(--color-neutral-6);
  border: 4px solid var(--color-neutral-6);
  border-radius: 4px;
  z-index: 3;
  margin-top: ${({ marginTop }) => marginTop || '-40px'};
  margin-left: -80px;
  transform: scale(0.75);
  .epg-time {
    color: var(--color-neutral-3);
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 18px;
    padding-top: 4px;
  }
  button {
    margin-bottom: 7px;
    margin-right: -4px;
  }
  svg {
    transform: scale(1.5);
    color: var(--color-neutral-5);
  }
  input {
    text-align: center;
  }
  .MuiPickerStaticWrapper-content {
    background-color: transparent;
    color: var(--color-neutral-3);
    button {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .MuiGrid-root {
      width: fit-content;
      margin-left: 40px;
    }
    .MuiTypography-overline,
    svg {
      display: none;
    }
    .MuiTypography-root {
      color: var(--color-neutral-3);
    }
    .MuiTypography-root.Mui-selected {
      color: var(--color-neutral-2);
    }
    .MuiClockPicker-root {
      span {
        color: var(--color-neutral-3);
      }
      .Mui-selected {
        color: var(--color-neutral-2);
      }
    }
  }
  .MuiDialogActions-root {
    button {
      display: none;
    }
  }
`;
