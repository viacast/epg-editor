import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import IconRL from 'assets/icons/ratings/RL.png';
import IconR10 from 'assets/icons/ratings/R10.png';
import IconR12 from 'assets/icons/ratings/R12.png';
import IconR14 from 'assets/icons/ratings/R14.png';
import IconR16 from 'assets/icons/ratings/R16.png';
import IconR18 from 'assets/icons/ratings/R18.png';

import data from './mockdata.json';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  Data,
  IconViacast,
  Message,
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
                  let value: string | JSX.Element = row[id];
                  if (id === 'rating') {
                    const ratings = {
                      RL: IconRL,
                      R10: IconR10,
                      R12: IconR12,
                      R14: IconR14,
                      R16: IconR16,
                      R18: IconR18,
                    };
                    value = (
                      <IconViacast src={ratings[row[id]]} alt={row[id]} />
                    );
                  }
                  return (
                    <StyledTableCell
                      key={id}
                      align={align}
                      style={{ minWidth }}
                    >
                      {value}
                      {id === 'rating' && (
                        <Message>
                          {t(`parental-guidance:rating_${row[id]}`)}
                        </Message>
                      )}
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
