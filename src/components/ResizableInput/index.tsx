import React, { KeyboardEvent, useEffect, useState } from 'react';
import { StyledInput } from './styles';

export interface ResizableInputProps {
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  onCtrlEnter?: (value: string) => void;
}

const ResizableInput: React.FC<ResizableInputProps> = ({
  value,
  setValue,
  placeholder,
  onCtrlEnter,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '');

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  return (
    <StyledInput
      onKeyDown={(e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
          onCtrlEnter?.(internalValue);
        }
      }}
      minRows={1}
      maxRows={4}
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
  placeholder: '',
  value: '',
  setValue: undefined,
  onCtrlEnter: undefined,
};

export default ResizableInput;
