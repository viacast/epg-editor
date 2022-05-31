import styled from 'styled-components';
import { styled as styledmui } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table, { tableClasses } from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';

export const StyledPaper = styledmui(Paper)`
  width: 100%;
  height: 100%;
  min-height: 300px;
  min-width: 1047px;
  white-space: nowrap;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
`;

export const StyledTableContainer = styledmui(TableContainer)`
  height: 100%;
  border-radius: 4px;
`;

export const StyledTable = styledmui(Table)`
  &.${tableClasses.root} {
    padding: 10px;
    border-radius: 4px;
    background-color: var(--color-neutral-5);
    text-overflow: ellipsis;
  }
`;

export const StyledTableCell = styledmui(TableCell)`
  &.${tableCellClasses.root} {
    max-width: 0px;
    overflow: hidden;
    color: var(--color-neutral-2);
    border-bottom: none;
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
    border-top: 6px solid var(--color-neutral-5);
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
  }
`;

export const StyledTableRow = styledmui(TableRow)`
  &.${tableRowClasses.root} {
    background-color: var(--color-neutral-6);
    border: 4px solid white;
  }
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
  max-width: 285px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
`;
