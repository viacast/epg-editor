import React from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

import { Program } from 'services/epg';
import { EntityMap, formatDate, formatTime, secondsToHms } from 'utils';
import {
  StyledPaper,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableRow,
  StyledText,
  IconRating,
  Message,
} from './styles';
import programTableColumns from './programTableColumns';

export interface ProgramTableProps {
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setSelectedProgramId: (programId: string) => void;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  programs,
  selectedProgramId,
  setSelectedProgramId,
}) => {
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
            {programs.toArray().map((program, i) => {
              return (
                <StyledTableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={program.id}
                  selected={selectedProgramId === program.id}
                  onClick={() => setSelectedProgramId(program.id)}
                >
                  {programTableColumns.map(({ id, align, format }) => {
                    let value: Program[keyof Program] | JSX.Element =
                      program[id];
                    if (format === 'startDateTime') {
                      value = `${formatDate(
                        program.startTime as Date,
                      )} ${formatTime(program.startTime as Date)}`;
                    }
                    if (format === 'endDateTime') {
                      const year = program.startTime.getFullYear();
                      const month = program.startTime.getMonth();
                      const day = program.startTime.getDate();
                      const hour = program.startTime.getHours();
                      const minute = program.startTime.getMinutes();
                      const second = program.startTime.getSeconds();
                      value = `${formatDate(
                        program.startTime as Date,
                      )} ${formatTime(
                        new Date(
                          year,
                          month,
                          day,
                          hour + Math.floor(program.duration / 3600),
                          minute + Math.floor((program.duration % 3600) / 60),
                          second + Math.floor((program.duration % 3600) % 60),
                        ) as Date,
                      )}`;
                    }
                    if (format === 'duration') {
                      value = secondsToHms(value as number);
                    }
                    if (id === 'position') {
                      value = `${i + 1}`;
                    }
                    if (id === 'rating') {
                      const ratings = {
                        SC: IconSC,
                        RL: IconRL,
                        R10: IconR10,
                        R12: IconR12,
                        R14: IconR14,
                        R16: IconR16,
                        R18: IconR18,
                      };
                      value = (
                        <IconRating
                          src={ratings[program[id]]}
                          alt={program[id]}
                        />
                      );
                    }
                    return (
                      <StyledTableCell key={id} align={align}>
                        <StyledText>
                          {value}
                          {id === 'rating' && (
                            <Message>
                              {t(`parental-guidance:rating_${program[id]}`)}
                            </Message>
                          )}
                        </StyledText>
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </StyledPaper>
  );
};

export default ProgramTable;
