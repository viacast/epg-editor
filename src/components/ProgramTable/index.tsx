import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import data from './mockdata.json';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  Data,
} from './styles';
import programTableColumns from './programTableColumns';

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

const ProgramTable: React.FC = () => {
  const { t } = useTranslation();

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
    <StyledPaper>
      <StyledTableContainer>
        <StyledTable stickyHeader>
          <TableHead>
            <StyledTableRow>
              {programTableColumns.map(({ id, align, minWidth }) => (
                <StyledTableCell key={id} align={align} style={{ minWidth }}>
                  {t(`program-table:columnLabel_${id}`)}
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
                key={row.position}
              >
                {programTableColumns.map(({ id, align, minWidth }) => {
                  const value = row[id];
                  return (
                    <StyledTableCell
                      key={id}
                      align={align}
                      style={{ minWidth }}
                    >
                      {value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledPaper>
  );
};

export default ProgramTable;
