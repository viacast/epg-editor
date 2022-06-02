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
  value?: string;
  placeholder?: string;
  setValue?: (value: string) => void;
  withClearButton?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

const Input: React.FC<InputProps> = ({
  disabled,
  value,
  placeholder,
  setValue,
  width,
  height,
  withClearButton,
  multiline,
  maxRows,
}) => {
  return (
    <StyledPaper width={width} height={height} className="epg-input">
      <StyledInput
        multiline={multiline}
        maxRows={maxRows}
        disabled={disabled}
        fullWidth
        placeholder={placeholder}
      />
      {value}
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
  placeholder: '',
  withClearButton: false,
  value: '',
  multiline: false,
  maxRows: 1,
};

export default Input;
