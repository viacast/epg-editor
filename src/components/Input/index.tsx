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
  defaultValue?: string;
  placeholder?: string;
  withClearButton?: boolean;
  multiline?: boolean;
  maxRows?: number;
}

const Input: React.FC<InputProps> = ({
  disabled,
  defaultValue,
  placeholder,
  width,
  height,
  withClearButton,
  multiline,
  maxRows,
}) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <StyledPaper
      width={width}
      height={height}
      sx={{ boxShadow: 'unset' }}
      className="epg-input"
    >
      <StyledInput
        multiline={multiline}
        maxRows={maxRows}
        disabled={disabled}
        fullWidth
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleChange}
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
  placeholder: '',
  withClearButton: false,
  defaultValue: '',
  multiline: false,
  maxRows: 1,
};

export default Input;
