import * as React from 'react';
import { CgClose } from 'react-icons/cg';
import {
  StyledDivider,
  StyledIconButton,
  StyledPaper,
  StyledInput,
} from './styles';

export interface InputProps {
  disabled: boolean;
  value: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  setValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  disabled,
  value,
  placeholder,
  setValue,
}) => {
  return (
    <StyledPaper>
      <StyledInput
        disabled={disabled}
        fullWidth
        value={value}
        placeholder={placeholder}
        inputProps={{
          style: {
            height: '11px',
          },
        }}
      />
      <StyledDivider orientation="vertical" />
      <StyledIconButton onClick={() => setValue?.('')} aria-label="directions">
        <CgClose />
      </StyledIconButton>
    </StyledPaper>
  );
};

export default Input;
