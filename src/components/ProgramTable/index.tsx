import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import RL from 'assets/icons/L.png';
import R10 from 'assets/icons/10.png';
import R12 from 'assets/icons/12.png';
import R14 from 'assets/icons/14.png';
import R16 from 'assets/icons/16.png';
import R18 from 'assets/icons/18.png';

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
                  let aux = '';
                  if (value === 'RL') {
                    value = <IconViacast src={RL} alt="RL" />;
                    aux = t(`parental-guidance:RL`);
                  } else if (value === 'R10') {
                    value = <IconViacast src={R10} alt="R10" />;
                    aux = t(`parental-guidance:R10`);
                  } else if (value === 'R12') {
                    value = <IconViacast src={R12} alt="R12" />;
                    aux = t(`parental-guidance:R12`);
                  } else if (value === 'R14') {
                    value = <IconViacast src={R14} alt="R14" />;
                    aux = t(`parental-guidance:R14`);
                  } else if (value === 'R16') {
                    value = <IconViacast src={R16} alt="R16" />;
                    aux = t(`parental-guidance:R16`);
                  } else if (value === 'R18') {
                    value = <IconViacast src={R18} alt="R18" />;
                    aux = t(`parental-guidance:R18`);
                  } else {
                    value = row[id];
                  }
                  return (
                    <StyledTableCell
                      key={id}
                      align={align}
                      style={{ minWidth }}
                    >
                      {value}
                      <Message>{aux}</Message>
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
