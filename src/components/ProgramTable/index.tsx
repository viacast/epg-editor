import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TableBody, TableHead } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';

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
  Checkbox,
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
  selectedProgramId: Set<string>;
  setSelectedProgramId: React.Dispatch<React.SetStateAction<Set<string>>>;
  setPrograms: React.Dispatch<React.SetStateAction<EntityMap<Program>>>;
}

const ProgramTable: React.FC<ProgramTableProps> = ({
  forwardRef,
  programs,
  selectedProgramId,
  setSelectedProgramId,
  setPrograms,
}) => {
  const { t } = useTranslation();
  const selectedRowRef = useRef<HTMLTableRowElement>(null);
  const scrollToSelected = useScrollIntoView({
    ref: selectedRowRef,
  });
  const [show, setShow] = useState(false);

  const idList: Set<string> = new Set();

  // eslint-disable-next-line prefer-spread
  const checkedList: boolean[] = Array.apply(
    null,
    Array(programs.toArray().length),
  ).map(Boolean.prototype.valueOf, false);

  const [check, setCheck] = useState(checkedList);
  const [checkall, setCheckAll] = useState(false);

  useEffect(() => {
    if (selectedProgramId.size === 0) {
      // eslint-disable-next-line prefer-spread
      const c: boolean[] = Array.apply(
        null,
        Array(programs.toArray().length),
      ).map(Boolean.prototype.valueOf, false);
      setCheck(c);
    }
  }, [setShow, selectedProgramId, programs]);

  useEffect(() => {
    if (selectedProgramId.size === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [setShow, selectedProgramId]);

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
                  {id === 'marker' ? (
                    <Checkbox
                      className="show"
                      onClick={() => {
                        setSelectedProgramId(p => {
                          if (p.size === programs.toArray().length) {
                            // eslint-disable-next-line prefer-spread
                            const c: boolean[] = Array.apply(
                              null,
                              Array(programs.toArray().length),
                            ).map(Boolean.prototype.valueOf, false);
                            setCheck(c);
                            setCheckAll(false);
                            return new Set();
                          }
                          const idsList: string[] = [];
                          programs.toArray().forEach(prog => {
                            const ref = prog.id;
                            idsList.push(ref);
                            return idsList;
                          });
                          // eslint-disable-next-line prefer-spread
                          const c: boolean[] = Array.apply(
                            null,
                            Array(programs.toArray().length),
                          ).map(Boolean.prototype.valueOf, true);
                          setCheck(c);
                          setCheckAll(true);
                          return new Set(idsList);
                        });
                      }}
                      checked={checkall}
                    />
                  ) : (
                    t(`program-table:columnLabel_${id}`)
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {programs.toArray().map((program, i) => {
              return (
                <StyledTableRow
                  onClick={() => {
                    idList.add(program.id);
                    setSelectedProgramId(idList);
                    // eslint-disable-next-line prefer-spread
                    const c: boolean[] = Array.apply(
                      null,
                      Array(programs.toArray().length),
                    ).map(Boolean.prototype.valueOf, false);
                    c.splice(i, 1, true);
                    setCheck(c);
                  }}
                  ref={
                    selectedProgramId.has(program.id)
                      ? selectedRowRef
                      : undefined
                  }
                  role="checkbox"
                  tabIndex={-1}
                  key={program.id}
                  selected={selectedProgramId.has(program.id)}
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
                    if (id === 'marker') {
                      value = '';
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
                            {id === 'marker' && (
                              <Checkbox
                                id={`epg-checkbox-${program.id}`}
                                onClick={e => {
                                  e.stopPropagation();
                                  if (selectedProgramId.has(program.id)) {
                                    setSelectedProgramId(p => {
                                      p.delete(program.id);
                                      check.splice(
                                        programs.toArray().indexOf(program),
                                        1,
                                        false,
                                      );
                                      setCheck(check);
                                      if (checkall) {
                                        setCheckAll(false);
                                      }
                                      return new Set(p);
                                    });
                                  } else {
                                    setSelectedProgramId(p => {
                                      p.add(program.id);
                                      check.splice(
                                        programs.toArray().indexOf(program),
                                        1,
                                        true,
                                      );
                                      setCheck(check);
                                      return new Set(p);
                                    });
                                  }
                                }}
                                className={show ? 'show' : ''}
                                checked={
                                  check[programs.toArray().indexOf(program)]
                                }
                              />
                            )}
                            {id === 'position' && (
                              <>
                                <HiPlus
                                  size="15px"
                                  onClick={e => {
                                    e.stopPropagation();
                                    const prog = programs.toArray();
                                    const prevProg = prog.indexOf(program) - 1;
                                    let addedProgram = new Program();
                                    if (prevProg === -1) {
                                      const startDateTime = addToDate(
                                        program.startDateTime,
                                        -3600,
                                      );
                                      addedProgram = new Program({
                                        duration: 3600,
                                        startDateTime,
                                      });
                                    } else {
                                      const previousProgram = prog[prevProg];
                                      const startDateTime = addToDate(
                                        previousProgram.startDateTime,
                                        previousProgram.duration,
                                      );
                                      addedProgram = new Program({
                                        duration: 3600,
                                        startDateTime,
                                      });
                                    }
                                    setPrograms(p =>
                                      p.add(addedProgram, program.id).clone(),
                                    );
                                    idList.add(addedProgram.id);
                                    setSelectedProgramId(idList);
                                    // eslint-disable-next-line prefer-spread
                                    const c: boolean[] = Array.apply(
                                      null,
                                      Array(programs.toArray().length),
                                    ).map(Boolean.prototype.valueOf, false);
                                    c.splice(i, 1, true);
                                    setCheck(c);
                                  }}
                                />
                                <div>
                                  <MdKeyboardArrowUp
                                    size="15px"
                                    onClick={e => {
                                      e.stopPropagation();
                                      setPrograms(p =>
                                        p.moveRelative(program.id, -1).clone(),
                                      );
                                      // eslint-disable-next-line prefer-spread
                                      const c: boolean[] = Array.apply(
                                        null,
                                        Array(programs.toArray().length),
                                      ).map(Boolean.prototype.valueOf, false);
                                      c.splice(i - 1, 1, true);
                                      setCheck(c);
                                    }}
                                  />
                                  <MdKeyboardArrowDown
                                    size="15px"
                                    onClick={e => {
                                      e.stopPropagation();
                                      setPrograms(p =>
                                        p.moveRelative(program.id, 1).clone(),
                                      );
                                      // eslint-disable-next-line prefer-spread
                                      const c: boolean[] = Array.apply(
                                        null,
                                        Array(programs.toArray().length),
                                      ).map(Boolean.prototype.valueOf, false);
                                      c.splice(i + 1, 1, true);
                                      setCheck(c);
                                    }}
                                  />
                                </div>
                              </>
                            )}
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
