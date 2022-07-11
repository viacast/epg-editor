import React, { KeyboardEvent, useEffect, useState } from 'react';
import { StyledInput, StylesProps } from './styles';

export interface ResizableInputProps extends StylesProps {
  disabled?: boolean;
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  maxRows?: number;
  onCtrlEnter?: (value: string) => void;
}

const ResizableInput: React.FC<ResizableInputProps> = ({
  disabled,
  value,
  setValue,
  placeholder,
  maxHeight,
  maxRows,
  onCtrlEnter,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  return (
    <StyledInput
      maxHeight={maxHeight}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
          onCtrlEnter?.(internalValue);
        }
      }}
      minRows={3}
      maxRows={maxRows}
      disabled={disabled}
      onChange={e => {
        setInternalValue(e.target.value);
        setValue?.(e.target.value);
      }}
      placeholder={placeholder}
      value={internalValue}
    />
  );
};

ResizableInput.defaultProps = {
  disabled: false,
  placeholder: '',
  value: '',
  maxRows: 1,
  setValue: undefined,
  onCtrlEnter: undefined,
};

export default ResizableInput;
