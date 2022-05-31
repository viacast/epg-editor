import React from 'react';
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
  setValue?: (value: string) => void;
  withClearButton?: boolean;
}

const Input: React.FC<InputProps> = ({
  disabled,
  value,
  placeholder,
  setValue,
  withClearButton,
}) => {
  return (
    <StyledPaper className="epg-input">
      <StyledInput
        disabled={disabled}
        fullWidth
        value={value}
        placeholder={placeholder}
      />
      {withClearButton && (
        <>
          <StyledDivider orientation="vertical" />
          <StyledIconButton onClick={() => setValue?.('')}>
            <CgClose />
          </StyledIconButton>
        </>
      )}
    </StyledPaper>
  );
};

Input.defaultProps = {
  setValue: undefined,
  withClearButton: false,
};

export default Input;
