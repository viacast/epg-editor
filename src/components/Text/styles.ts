import styled, { css } from 'styled-components';
import { ColorPallete } from 'styles/global';
import { hasValue } from 'utils';

export interface TextStyleProps {
  inline?: boolean;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  underlined?: boolean;
}

export const Container = styled.div<TextStyleProps>`
  padding: 0;
  margin: 0;
  color: ${({ color }) => color || ColorPallete.NEUTRAL_2};
  ${({ inline }) =>
    inline &&
    css`
      display: inline;
    `}
  ${({ fontSize }) =>
    hasValue(fontSize) &&
    css`
      font-size: ${fontSize};
    `}
  ${({ fontFamily }) =>
    hasValue(fontFamily) &&
    css`
      font-family: ${fontFamily};
    `}
  ${({ underlined }) =>
    underlined &&
    css`
      text-decoration: underline;
      text-underline-offset: 2px;
    `}
`;
