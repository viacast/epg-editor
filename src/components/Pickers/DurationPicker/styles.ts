import {
  TextField,
  Box,
  Button,
  styled as muistyled,
  IconButton,
} from '@mui/material';
import { Stack } from '@mui/system';
import styled from 'styled-components';

export const StyledContainer = muistyled(Box)`
  position: relative;
  width: 206px;
`;

export const StyledTitle = styled.div`
  margin-top: -20px;
  margin-left: 10px;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

export const StyledInputStack = muistyled(Stack)`
  width: 206px;
  max-height: 42px;
  background-color: var(--color-neutral-6);
  border-radius: 4px;
`;

export const StyledIconContainer = muistyled(IconButton)`
  position: absolute;
  padding-block: auto;
  left: 165px;
  svg {
    font-size: 24px;
  }
  color: var(--color-neutral-5);
  cursor: pointer;
`;

export const StyledBoxStack = muistyled(Stack)<{ marginTop: string }>`
  position: relative;
  z-index: 2;
  margin-top: ${({ marginTop }) => marginTop || '5px'};
  background-color: var(--color-neutral-6);
  width: 389px;
  height: 176px;
  border-radius: 4px;
  margin-inline: auto;
`;

export const StyledInput = muistyled(TextField)`
  width: 100%;
  height: 100%;
  max-width: 140px;
  max-height: 42px;
  display: flex;
  text-align: right;
  vertical-align: middle;
  text-transform: none;
  border-radius: 4px;
  background-color: var(--color-neutral-6);
  padding-left: 32px;
  
  .MuiOutlinedInput-root,
  .MuiInputBase-root {
    font-size: 18px;
    color: var(--color-neutral-3);
  }
  .MuiInputBase-input, MuiOutlinedInput-input {
    padding: 9.5px 14px;
  }
  .MuiOutlinedInput-notchedOutline {
    color: var(--color-neutral-3);
    border: none;
  }
  .MuiInputLabel-root {
    color: var(--color-neutral-3);
  }
  .MuiOutlinedInput-input {
    color: var(--color-neutral-3);
  }
`;

export const StyledInputsContainer = muistyled(Box)`
  position: relative;
  display: row;
  bottom: -35px;
  color: var(--color-neutral-3);
  font-family: 'Nunito, sans-serif';
  margin-inline: auto;
  & > :not(style) {
    m: 1;
    width: '25ch'
  }
`;

export const StyledGroups = styled.div`
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const StyledInputs = muistyled(TextField)`
  color: var(--color-neutral-3);
  background-color: var(--color-neutral-6);
  border-radius: 4px;
  margin-inline: 10px;
  max-width: 96px;
  .MuiOutlinedInput-notchedOutline {
    border-color: var(--color-neutral-6);
  }
  & .MuiInput-underline:after {
    border-bottom-color: var(--color-primary-2);
  }
  & .MuiInputLabel-root {
    color: var(--color-neutral-3);
  }
  & .MuiOutlinedInput-input {
    font-family: Nunito, sans-serif;
    font-size: 56px;
    max-height: 34px;
    text-align: center;
    color: var(--color-neutral-3);
  }
`;

export const StyledFooter = muistyled(Box)`
  position: relative;
  bottom: -17px;
  padding-inline: auto;
  margin-left: 195px;
  & > :not(style) { 
    m: 1;
    width: '2ch'
 }
`;

export const SetyledButton = muistyled(Button)`
  color: var(--color-primary-2);
  left: -25px;
  font-size: 18px;
  maxWidth: 96px;
  & .MuiButtonBase-root {
    maxWidth: 96px;
  }
`;
