import styled from 'styled-components';

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

export const RowElement = styled.div``;

export const AddToList = styled.div`
  display: none;
  svg {
    color: var(--color-neutral-2);
    width: 15px;
    height: 50px;
    position: relative;
    margin-left: 15px;
    vertical-align: middle;
    z-index: 3;
    cursor: pointer;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 2px;
  min-width: 20px;
`;

export const AlertsGroup = styled.div`
  min-width: 30px;
  max-width: 30px;
`;

export const Alerts = styled.div<{ display: string }>`
  margin-left: 2px;
  margin-right: 2px;
  display: ${({ display }) => display || 'none'};
`;

export const LoaderContainer = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const Text = styled.h1``;
