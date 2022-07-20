import styled from 'styled-components';

export const StyledText = styled.span<{ maxWidth?: string }>`
  display: block;
  max-width: ${({ maxWidth }) => maxWidth || '645px'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const IconRating = styled.img`
  float: left;
  margin-right: 14px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Message = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;
