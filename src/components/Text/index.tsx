import React from 'react';

import { Container, TextStyleProps } from './styles';

export interface TextProps extends TextStyleProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  forwardRef?: React.RefObject<HTMLDivElement>;
  // eslint-disable-next-line react/require-default-props
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
      className={`epg-text ${className} ${noSelect ? ' no-user-select' : ''}`}
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
