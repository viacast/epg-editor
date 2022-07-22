import styled from 'styled-components';
import { styled as styledmui } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table, { tableClasses } from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';

export const StyledPaper = styledmui(Paper)`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
  overflow: hidden;
`;

export const StyledTableContainer = styledmui(TableContainer)`
  border-radius: 4px;
`;

export const StyledTable = styledmui(Table)`
  &.${tableClasses.root} {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-radius: 4px;
    background-color: var(--color-neutral-5);
    overflow: hidden;
  }
`;

export const StyledTableCell = styledmui(TableCell)`
  &.${tableCellClasses.root} {
    max-width: 0px;
    overflow: hidden;
    color: var(--color-neutral-2);
    border-bottom: none;
    &:not(:first-child) {
      text-overflow: ellipsis;
    }
  }
  &:last-child td,
  &:last-child th {
    border-bottom: 6px solid var(--color-neutral-5);
  }
  &.${tableCellClasses.head} {
    font-size: 18px;
    font-weight: 700;
    background-color: var(--color-neutral-5);
    border-bottom: 4px solid var(--color-neutral-1);
  }
  &.${tableCellClasses.body} {
    cursor: pointer;
    border-top: 6px solid var(--color-neutral-5);
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
  }
`;

export const StyledTableRow = styledmui(TableRow)<{ selected?: boolean }>`
  &.${tableRowClasses.root} {
    background-color: var(--color-neutral-6);
    border: 4px solid white;
    user-select: none;
    ${({ selected }) =>
      selected
        ? `background-color: var(--color-primary-2); :hover { background-color: var(--color-primary-2); }`
        : `:hover { background-color: var(--color-primary-5); }`};
  }
  div {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    margin-right: 10px;
    height: 30px;
  }
  
  input[type="checkbox"] {
    position: relative;
    margin-inline: 5px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    color: var(--color-neutral-1);
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: '';
      display: block;
      top: 3.5px;
      left: 6px;
      width: 4px;
      height: 7px;
      border-style: solid;
      border-color: var(--color-neutral-2);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      color: var(--color-neutral-2);
      border-color: var(--color-neutral-2);
      background: trasparent;
      &::before {
        opacity: 1;
      }
      ~ label::before {
        clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
      }
    }
  }
  
  svg, input {
    display: none;
    margin-right: 10px;
    color: var(--color-neutral-2);
    vertical-align: middle;
    &:active {
      opacity: .5;
    }
    cursor: pointer;
  }
  .show {
    display: inline-flex;
  }
  &:hover {
    svg, input {
      display: inline-flex;
    }
    svg {
      &:hover {
        opacity: .5;
      }
    }
  }
`;

export const StyledText = styled.span<{ maxWidth?: string }>`
  display: block;
  max-width: ${({ maxWidth }) => maxWidth || '645px'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-left: 2px;
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
