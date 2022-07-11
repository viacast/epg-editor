import { TextareaAutosize, TextareaAutosizeProps, styled } from '@mui/material';

export interface StylesProps extends TextareaAutosizeProps {
  maxWidth?: string;
  maxHeight?: string;
}

export const StyledInput = styled(TextareaAutosize, {
  shouldForwardProp: prop =>
    !['maxHeight', 'maxWidth'].includes(prop as string),
})<StylesProps>`
  min-width: 442px;
  max-width: 442px;
  min-height: 44px;
  height: 130px;
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  max-height: ${({ maxHeight }) => maxHeight || '130px'};
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
