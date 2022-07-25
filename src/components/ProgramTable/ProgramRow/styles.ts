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

export const AddReorderIconsContainer = styled.div`
  display: inline-block;

  svg {
    display: none;
    margin-right: 10px;
    color: var(--color-neutral-2);
    vertical-align: middle;
  }
`;

export const ReorderIconsContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  margin-right: 10px;
  height: 30px;
`;
