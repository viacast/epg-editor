import React, { KeyboardEvent, useEffect, useState } from 'react';
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
  onCtrlEnter?: (value: string) => void;
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
  onCtrlEnter,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  return (
    <StyledPaper width={width} height={height} className="epg-input">
      <StyledInput
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.ctrlKey && e.key === 'Enter') {
            onCtrlEnter?.(internalValue);
          }
        }}
        multiline={multiline}
        maxRows={maxRows}
        disabled={disabled}
        fullWidth
        onChange={e => {
          setInternalValue(e.target.value);
          setValue?.(e.target.value);
        }}
        placeholder={placeholder}
        value={internalValue}
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
  onCtrlEnter: undefined,
};

export default Input;
