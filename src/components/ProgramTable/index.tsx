import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import IconRL from 'assets/icons/ratings/RL.png';
import IconR10 from 'assets/icons/ratings/R10.png';
import IconR12 from 'assets/icons/ratings/R12.png';
import IconR14 from 'assets/icons/ratings/R14.png';
import IconR16 from 'assets/icons/ratings/R16.png';
import IconR18 from 'assets/icons/ratings/R18.png';
import { Program } from 'services/epg';

import { formatDate, formatTime, secondsToHms } from 'utils';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  IconViacast,
  Message,
} from './styles';
import programTableColumns from './programTableColumns';

export interface ProgramTableProps {
  programs: Program[];
}

const ProgramTable: React.FC<ProgramTableProps> = ({ programs }) => {
  const { t } = useTranslation();

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
            {programs.map((program, i) => (
              <StyledTableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={program.id}
              >
                {programTableColumns.map(({ id, align, minWidth, format }) => {
                  let value: Program[keyof Program] | JSX.Element = program[id];
                  if (format === 'date') {
                    value = formatDate(value as Date);
                  }
                  if (format === 'time') {
                    value = formatTime(value as Date);
                  }
                  if (format === 'duration') {
                    value = secondsToHms(value as number);
                  }
                  if (id === 'position') {
                    value = `${i + 1}`;
                  }
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
                      <IconViacast
                        src={ratings[program[id]]}
                        alt={program[id]}
                      />
                    );
                  }
                  // if (format === 'date') {
                  //   value = formatDate(value, 'dd/MM/yyyy');
                  // }
                  // if (format === 'time') {
                  //   value = formatDate(value, 'HH:mm:ss');
                  // }
                  return (
                    <StyledTableCell
                      key={id}
                      align={align}
                      style={{ minWidth }}
                    >
                      {value}
                      {id === 'rating' && (
                        <Message>
                          {t(`parental-guidance:rating_${program[id]}`)}
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
