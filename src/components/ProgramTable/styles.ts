import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table, { tableClasses } from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';

export const StyledPaper = styled(Paper)`
  width: 100vw;
  height: 100%;
  min-height: 300px;
  min-width: 1047px;
  white-space: nowrap;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
`;

export const StyledTableContainer = styled(TableContainer)`
  height: 100%;
  border-radius: 4px;
`;

export const StyledTable = styled(Table)`
  &.${tableClasses.root} {
    padding: 10px;
    border-radius: 4px;
    background-color: var(--color-neutral-5);
    text-overflow: ellipsis;
  }
`;

export const StyledTableCell = styled(TableCell)`
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

export const StyledTableRow = styled(TableRow)`
  &.${tableRowClasses.root} {
    background-color: var(--color-neutral-6);
    border: 4px solid white;
  }
`;

export interface Column {
  id:
    | 'position'
    | 'date'
    | 'hour'
    | 'duration'
    | 'title'
    | 'description'
    | 'rating';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

export interface Data {
  position: string;
  date: string;
  hour: string;
  duration: string;
  title: string;
  description: string;
  rating: string;
}
