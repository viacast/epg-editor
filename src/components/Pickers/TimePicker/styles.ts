import { TextField, styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
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
