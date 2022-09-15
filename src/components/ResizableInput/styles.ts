import { TextareaAutosize, styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const StyledInput = styled(TextareaAutosize)`
  min-width: 432px;
  max-width: 442px;
  min-height: 130px;
  max-height: 270px;
  display: flex;
  text-align: left;
  color: var(--color-neutral-3);
  padding: 15px;
  vertical-align: middle;
  text-transform: none;
  font-size: 16px;
  border: transparent;
  border-radius: 4px;
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
