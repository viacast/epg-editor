import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TableBody, TableHead } from '@mui/material';
import { useTranslation } from 'react-i18next';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

// import { BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi';

import { Program } from 'services/epg';
import { EntityMap, formatDate, formatTime, secondsToHms } from 'utils';
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
  // Reorder,
} from './styles';
import programTableColumns from './programTableColumns';

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

  const useResize = myRef => {
    const [width, setWidth] = useState(906);

    const handleResize = useCallback(() => {
      setWidth(myRef.current.offsetWidth);
    }, [myRef]);

    useEffect(() => {
      window.addEventListener('resize', handleResize);
    }, [myRef, handleResize]);

    setTimeout(() => {
      handleResize();
    }, 100);

    return { width };
  };

  const componentRef = useRef();
  const { width } = useResize(componentRef);

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
                  {programTableColumns.map(
                    ({ id, align, format, minWidth }) => {
                      let value: Program[keyof Program] | JSX.Element =
                        program[id];
                      const pc = minWidth ?? 1;
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
                      return (
                        <StyledTableCell
                          key={id}
                          align={align}
                          ref={componentRef}
                        >
                          <StyledText
                            maxWidth={`${(width * (pc / 680)).toString()}px`}
                          >
                            {value}
                            {id === 'rating' && (
                              <Message>
                                {t(`parental-guidance:rating_${program[id]}`)}
                              </Message>
                            )}
                          </StyledText>
                        </StyledTableCell>
                      );
                    },
                  )}
                  {/* <Reorder>
                    <BiArrowFromBottom size={25} />
                    <BiArrowFromTop size={25} />
                  </Reorder> */}
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
