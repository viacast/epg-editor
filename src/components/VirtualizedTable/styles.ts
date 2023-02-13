import styled from 'styled-components';

export const ParentalGuidanceCells = styled.div`
  width: 225.5px;
  margin-inline: 50px;
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
  height: 24px;
  line-height: 24px;
`;

export const RowElement = styled.td``;

export const TableContainer = styled.div`
  /* .ReactVirtualized__Table__headerTruncatedText {
    margin-left: 75px;
  } */
`;

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
    :hover {
      color: var(--color-neutral-3);
    }
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 2px;
  min-width: 20px;
`;

export const MessagesContainer = styled.div`
  min-width: 30px;
  max-width: 30px;
`;

export const ValidationMessage = styled.div`
  position: absolute;
  transform: scale(0.75);
  margin-top: -20px;
`;

export const LoaderContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;
