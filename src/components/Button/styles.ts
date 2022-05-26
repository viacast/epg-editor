import { Button, ButtonProps, styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const ButtonContainer = styled(Button)<ButtonProps>`
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
  justify-content: normal;
  .icon {
    width: 44px;
    display: flex;
    justify-content: center;
  }
  .text {
    margin: auto;
  }
  .line {
    width: 2px;
    height: 50%;
    border-left: 2px solid var(--color-neutral-3);
  }
  &:hover {
    color: var(--color-neutral-2);
    border-color: var(--color-neutral-2);
    background-color: transparent;
    .line {
      border-color: var(--color-neutral-2);
    }
  }
`;
