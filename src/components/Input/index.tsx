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
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  withClearButton?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

const Input: React.FC<InputProps> = ({
  disabled,
  value,
  setValue,
  placeholder,
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
        onChange={e => {
          setValue?.(e.target.value);
        }}
        placeholder={placeholder}
        value={value}
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
  disabled: false,
  placeholder: '',
  withClearButton: false,
  value: '',
  multiline: false,
  maxRows: 1,
  setValue: undefined,
};

export default Input;
