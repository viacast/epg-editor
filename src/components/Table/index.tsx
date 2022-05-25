import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table, { tableClasses } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import data from './mockdata.json';

const StyledTable = styled(Table)(() => ({
  [`&.${tableClasses.root}`]: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: 'var(--color-neutral-5)',
  },
}));

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.root}`]: {
    color: 'var(--color-neutral-2)',
    borderBottom: 'none',
  },
  '&:last-child td, &:last-child th': {
    borderBottom: '6px solid var(--color-neutral-5)',
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: 18,
    fontWeight: '700',
    backgroundColor: 'var(--color-neutral-5)',
    borderBottom: '4px solid var(--color-neutral-1)',
  },
  [`&.${tableCellClasses.body}`]: {
    borderTop: '6px solid var(--color-neutral-5)',
    fontSize: 16,
    fontWeight: '700',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  [`&.${tableRowClasses.root}`]: {
    backgroundColor: 'var(--color-neutral-6)',
    border: '4px solid white',
  },
}));

interface Column {
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

interface Data {
  position: string;
  date: string;
  hour: string;
  duration: string;
  title: string;
  description: string;
  rating: string;
}

function createData(
  position: string,
  date: string,
  hour: string,
  duration: string,
  title: string,
  description: string,
  rating: string,
): Data {
  return { position, date, hour, duration, title, description, rating };
}

const CustomizedTables: React.FC = () => {
  const { t } = useTranslation();

  const columns: readonly Column[] = [
    { id: 'position', label: '#', minWidth: 100 },
    { id: 'date', label: `${t('table:date')}`, minWidth: 150 },
    {
      id: 'hour',
      label: `${t('table:hour')}`,
      minWidth: 150,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'duration',
      label: `${t('table:duration')}`,
      minWidth: 150,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'title',
      label: `${t('table:title')}`,
      minWidth: 200,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'description',
      label: `${t('table:description')}`,
      minWidth: 500,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'rating',
      label: `${t('table:rating')}`,
      minWidth: 200,
      align: 'left',
      format: (value: number) => value.toLocaleString('en-US'),
    },
  ];

  const newData = data.map(e => {
    return createData(
      e.position,
      e.date,
      e.hour,
      e.duration,
      e.title,
      e.description,
      e.rating,
    );
  });

  const rows = newData;

  return (
    <Paper
      sx={{
        width: '1802px',
        height: '660px',
        overflow: 'hidden',
        borderRadius: '4px',
        backgroundColor: 'var(--color-neutral-5)',
      }}
    >
      <TableContainer sx={{ height: '660px', borderRadius: '4px' }}>
        <StyledTable stickyHeader aria-label="sticky caption table">
          <TableHead>
            <StyledTableRow>
              {columns.map(column => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.date}
              >
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </Paper>
  );
};

export default CustomizedTables;
