/* eslint-disable react/require-default-props */
import React from 'react';

import { Container, TextStyleProps } from './styles';

export interface TextProps extends TextStyleProps {
  className?: string;
  forwardRef?: React.RefObject<HTMLDivElement>;
  noSelect?: boolean;
}

const Text: React.FC<TextProps> = ({
  className,
  forwardRef,
  noSelect,
  inline,
  fontFamily,
  fontSize,
  color,
  children,
  underlined,
}) => {
  return (
    <Container
      className={`text${noSelect ? ' no-user-select' : ''}${
        className ? ` ${className}` : ''
      }`}
      inline={inline}
      fontFamily={fontFamily}
      fontSize={fontSize}
      color={color}
      underlined={underlined}
      ref={forwardRef}
    >
      <span>{children}</span>
    </Container>
  );
};

export default Text;
