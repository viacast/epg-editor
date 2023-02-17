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

export const RowElement = styled.td<{ width: string; left: string }>``;

export const TableContainer = styled.div`
  /* .ReactVirtualized__Table__headerTruncatedText {
    margin-left: 75px;
  } */
`;

export const Timeline = styled.div<{ top: string }>`
  position: fixed;
  top: ${({ top }) => top || '0px'};
  z-index: 2;
  width: 100%;
  height: 3px;
  background-color: var(--color-system-1);
`;

export const FillGapLine = styled.div<{ top: string }>`
  position: fixed;
  top: ${({ top }) => top || '0px'};
  z-index: 2;
  width: 100%;
  height: 3px;
  background-color: var(--color-system-2);
`;

export const FillGapLabel = styled.div<{ width: string }>`
  --variable-width: ${({ width }) => width || '59px'};
  position: fixed;
  height: 100%;
  display: inline-block;
  vertical-align: baseline;
  font-weight: bold;
  vertical-align: top;
  cursor: pointer;
  z-index: 3;
  margin-top: -12px;
  left: calc(50% - var(--variable-width));
  width: fit-content;
  height: 25px;
  border-radius: 5px;
  background-color: var(--color-system-2);
  padding: 2.5px 5px 5px 5px;
  :hover ul {
    visibility: visible;
    opacity: 1;
    padding: 4px 0 6px;
  }
`;

export const FillGapOptionsContainer = styled.ul<{ left: string }>`
  visibility: hidden;
  position: absolute;
  border-top: 4px solid var(--color-neutral-5);
  width: fit-content;
  top: 100%;
  left: ${({ left }) => left || '-12.5px'};
  right: 0;
  border-radius: 5px;
  background-color: var(--color-neutral-3);
  -webkit-box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    0 1px 2px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.9),
    0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const FillGapOptions = styled.li`
  padding: 0 12px;
  font-size: 11px;
  color: var(--color-neutral-3);
  list-style-type: none;
`;

export const FillGapOptionsContent = styled.div`
  display: block;
  position: relative;
  margin: 0 -13px;
  padding: 0 20px 0 12px;
  color: var(--color-neutral-1);
  border: 1px solid transparent;
  :hover {
    color: var(--color-neutral-2);
    text-decoration: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    border-color: var(--color-primary-2) #495d98 #42558a;
    background-color: var(--color-primary-2);
  }
  :hover:after {
    display: block;
  }
  // Arrows //
  :after {
    display: none;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    right: 5px;
    margin-top: -4px;
    border: 4px solid transparent;
    border-left-color: #9facd1;
    border-left-color: rgba(255, 255, 255, 0.4);
  }
`;

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
