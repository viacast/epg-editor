import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableHead } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { useTranslation } from 'react-i18next';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

import { Program } from 'services/epg';
import { addToDate, EntityMap, formatDateTime, secondsToHms } from 'utils';
import { useScrollIntoView } from 'hooks';
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

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

export interface ProgramTableRefProps {
  scrollToSelected?: (options?: ScrollToOptions) => void;
}

export interface ProgramTableProps {
  forwardRef?: React.MutableRefObject<ProgramTableRefProps>;
  programs: EntityMap<Program>;
  selectedProgramId: string;
  setSelectedProgramId: (programId: string) => void;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  forwardRef,
  programs,
  selectedProgramId,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();
  const selectedRowRef = useRef<HTMLTableRowElement>(null);
  const scrollToSelected = useScrollIntoView({
    ref: selectedRowRef,
  });

  if (forwardRef?.current) {
    // eslint-disable-next-line no-param-reassign
    forwardRef.current.scrollToSelected = scrollToSelected;
  }

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
                  ref={
                    selectedProgramId === program.id
                      ? selectedRowRef
                      : undefined
                  }
                  role="checkbox"
                  tabIndex={-1}
                  key={program.id}
                  selected={selectedProgramId === program.id}
                  onClick={() => setSelectedProgramId(program.id)}
                >
                  {programTableColumns.map(({ id, align, format }) => {
                    let value: Program[keyof Program] | JSX.Element =
                      program[id];
                    if (id === 'position') {
                      value = `${i + 1}`;
                    }
                    if (id === 'endDateTime') {
                      value = addToDate(
                        program.startDateTime,
                        program.duration,
                      );
                    }
                    if (id === 'rating') {
                      const ratings = {
                        RSC: IconSC,
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
                    if (format === 'dateTime') {
                      value = formatDateTime(value as Date);
                    }
                    if (format === 'duration') {
                      value = secondsToHms(value as number);
                    }
                    return (
                      <StyledTableCell key={id} align={align}>
                        <CustomWidthTooltip
                          title={
                            <>
                              {id !== 'rating' && value}
                              {id === 'rating' && (
                                <Message>
                                  {t(`parental-guidance:rating_${program[id]}`)}
                                </Message>
                              )}
                            </>
                          }
                          arrow
                        >
                          <StyledText>
                            {value}
                            {id === 'rating' && (
                              <Message>
                                {t(`parental-guidance:rating_${program[id]}`)}
                              </Message>
                            )}
                          </StyledText>
                        </CustomWidthTooltip>
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

ProgramTable.defaultProps = {
  forwardRef: undefined,
};

export default ProgramTable;
