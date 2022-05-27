import styled from 'styled-components';
import { Button, ButtonProps, styled as muistyled } from '@mui/material';

export const Icon = styled.div`
  width: 44px;
  justify-content: center;
  display: flex;
`;
export const Line = styled.div`
  width: 2px;
  height: 50%;
  border-left: 2px solid;
`;

export const Text = styled.div`
  margin: auto;
`;

export const ButtonContainer = muistyled(Button)<ButtonProps>`
  display: flex;
  width: 139px;
  height: 44px;
  border: 2px solid var(--color-neutral-3);
  padding: 0 0;
  cursor: pointer;
  text-transform: none;
  transition: none;
  border-radius: 2px;
  color: var(--color-neutral-3);
  background-color: transparent;

  &:hover {
    color: var(--color-neutral-2);
    border-color: var(--color-neutral-2);
    background-color: transparent;
  }
`;
