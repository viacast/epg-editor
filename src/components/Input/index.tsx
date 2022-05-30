import React from 'react';
import { CgClose } from 'react-icons/cg';
import {
  StyledDivider,
  StyledIconButton,
  StyledPaper,
  StyledInput,
  PaperStylesProps,
} from './styles';

export interface InputProps extends PaperStylesProps {
  disabled: boolean;
  value: string;
  placeholder: string;
  setValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  disabled,
  value,
  placeholder,
  setValue,
  width,
  height,
}) => {
  return (
    <StyledPaper width={width} height={height} className="epg-input">
      <StyledInput
        disabled={disabled}
        fullWidth
        value={value}
        placeholder={placeholder}
      />
      <StyledDivider orientation="vertical" />
      <StyledIconButton onClick={() => setValue?.('')}>
        <CgClose />
      </StyledIconButton>
    </StyledPaper>
  );
};

Input.defaultProps = {
  setValue: undefined,
};

export default Input;
