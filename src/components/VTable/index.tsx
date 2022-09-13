import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { EPGValidator, Program } from 'services/epg';
import { addToDate, EntityMap, formatDateTime, secondsToHms } from 'utils';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

import { IconButton, TableRow } from '@mui/material';
import { HiPlus } from 'react-icons/hi';
import { IoIosAlert, IoIosInformationCircle } from 'react-icons/io';

import { BeatLoader } from 'react-spinners';
import { RiAlertFill } from 'react-icons/ri';
import { EPGValidationMessages } from 'services/epg/validator';
import {
  IconRating,
  Message,
  RowElement,
  AddToList,
  Checkbox,
  Alerts,
  AlertsGroup,
  LoaderContainer,
} from './styles';

export interface ProgramTableProps {
  width: number;
  height: number;
  programs: EntityMap<Program>;
  selectedProgramId: Set<string>;
  toggleClass: boolean;
  setWidth: (val: number) => void;
  setPrograms: React.Dispatch<React.SetStateAction<EntityMap<Program>>>;
  setSelectedProgramId: React.Dispatch<React.SetStateAction<Set<string>>>;
  setToggleClass: (val: boolean) => void;
  setSelectedProgram: (val: Program) => void;
}

const getItemStyle = (style, isDragging, draggableStyle) => ({
  position: 'relative',
  userSelect: 'none',
  textAlign: 'left',
  color: 'var(--color-neutral-2)',
  fontFamily: 'Nunito, sans-serif',
  background: isDragging ? 'var(--color-primary-2)' : 'var(--color-neutral-6)',
  cursor: isDragging ? 'grabbing' : 'grab',
  ...draggableStyle,
  ...style,
});

const rowCache = {};

const rate = {
  RSC: IconSC,
  RL: IconRL,
  R10: IconR10,
  R12: IconR12,
  R14: IconR14,
  R16: IconR16,
  R18: IconR18,
};

const VTable: React.FC<ProgramTableProps> = ({
  width,
  height,
  programs,
  selectedProgramId,
  toggleClass,
  setWidth,
  setPrograms,
  setToggleClass,
  setSelectedProgramId,
  setSelectedProgram,
}) => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<Record<string, EPGValidationMessages>>(
    {},
  );

  useEffect(() => {
    setAlerts(EPGValidator.validate(programs.toArray()));
  }, [programs]);

  useEffect(() => {
    if (!toggleClass && !selectedProgramId.size) {
      Array.from(document.querySelectorAll('.active')).forEach(el =>
        el.classList.remove('active'),
      );
    }
  }, [toggleClass, selectedProgramId]);

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return;
      }
      setPrograms(p => {
        let sourceKey = p.at(result.source.index)?.id;
        let targetKey = p.at(result.destination.index)?.id;
        if (result.source.index < result.destination.index) {
          sourceKey = p.at(result.source.index)?.id;
          targetKey = p.at(result.destination.index + 1)?.id;
        }
        if (!sourceKey || !targetKey) {
          return p;
        }
        return p.moveTo(sourceKey, targetKey).clone();
      });
    },
    [setPrograms],
  );

  const getRowRender = virtualizedRowProps => {
    const program = programs.at(virtualizedRowProps.index);

    if (!program) {
      return null;
    }

    rowCache[virtualizedRowProps.index] = virtualizedRowProps;
    // eslint-disable-next-line no-param-reassign
    virtualizedRowProps.columns[5] = (
      <div className="epg-pg">
        <IconRating
          src={rate[virtualizedRowProps.columns[5].props.title]}
          alt={virtualizedRowProps.columns[5].props.title}
        />
        <Message>
          {t(
            `parental-guidance:rating_${virtualizedRowProps.columns[5].props.title}`,
          )}
        </Message>
      </div>
    );

    let showError = false;
    let showWarn = false;
    let showInfo = false;

    if (alerts[program.id].ERROR.length) {
      showError = true;
    }

    if (!showError && alerts[program.id].WARN.length) {
      showWarn = true;
    }

    if (!showWarn && alerts[program.id].INFO.length) {
      showInfo = true;
    }

    return (
      <Draggable
        draggableId={program.id}
        index={virtualizedRowProps.index}
        key={program.id}
      >
        {(provided, snapshot) => (
          <TableRow
            hover
            onClick={e => {
              if (e.ctrlKey) {
                if (selectedProgramId.has(program.id)) {
                  selectedProgramId.delete(program.id);
                  document
                    .getElementById(program.id)
                    ?.classList.remove('active');
                } else {
                  selectedProgramId.add(program.id);
                  document.getElementById(program.id)?.classList.add('active');
                }
                if (selectedProgramId.size === 1) {
                  setToggleClass(true);
                } else {
                  setToggleClass(false);
                }
                setSelectedProgramId(selectedProgramId);
              } else if (!e.ctrlKey) {
                if (selectedProgramId.has(program.id)) {
                  selectedProgramId.delete(program.id);
                  document
                    .getElementById(program.id)
                    ?.classList.remove('active');
                } else {
                  selectedProgramId.clear();
                  selectedProgramId.add(program.id);
                  Array.from(document.querySelectorAll('.active')).forEach(el =>
                    el.classList.remove('active'),
                  );
                  document.getElementById(program.id)?.classList.add('active');
                  setSelectedProgram(programs.get(program.id) ?? new Program());
                }
                if (selectedProgramId.size === 1) {
                  setToggleClass(true);
                } else {
                  setToggleClass(false);
                }
                setSelectedProgramId(selectedProgramId);
              }
            }}
          >
            <RowElement
              id={program.id}
              ref={provided.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.draggableProps}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.dragHandleProps}
              key={virtualizedRowProps.key}
              className={virtualizedRowProps.className}
              style={getItemStyle(
                virtualizedRowProps.style,
                snapshot.isDragging,
                provided.draggableProps.style,
              )}
            >
              <Checkbox
                onClick={e => {
                  e.stopPropagation();
                  if (selectedProgramId.has(program.id)) {
                    selectedProgramId.delete(program.id);
                    document
                      .getElementById(program.id)
                      ?.classList.remove('active');
                  } else {
                    selectedProgramId.add(program.id);
                    document
                      .getElementById(program.id)
                      ?.classList.add('active');
                  }
                  if (selectedProgramId.size === 1) {
                    setToggleClass(true);
                  } else {
                    setToggleClass(false);
                  }
                  setSelectedProgramId(selectedProgramId);
                }}
                checked={selectedProgramId.has(program.id)}
              />{' '}
              <AlertsGroup>
                <Alerts display={showError ? 'block' : 'none'}>
                  <IconButton>
                    <IoIosAlert size="20px" color="var(--color-system-1)" />
                  </IconButton>
                </Alerts>
                <Alerts display={showWarn ? 'block' : 'none'}>
                  <IconButton>
                    <RiAlertFill size="20px" color="var(--color-system-2)" />
                  </IconButton>
                </Alerts>
                <Alerts display={showInfo ? 'block' : 'none'}>
                  <IconButton>
                    <IoIosInformationCircle
                      size="20px"
                      color="var(--color-neutral-3)"
                    />
                  </IconButton>
                </Alerts>
              </AlertsGroup>
              <AddToList className="epg-add-to-list">
                <HiPlus
                  onClick={e => {
                    e.stopPropagation();
                    const newProgram = new Program({
                      duration: 3600,
                      startDateTime: program.startDateTime,
                    });
                    setPrograms(p => p.add(newProgram, program.id).clone());
                    if (width - 540 <= 815) {
                      setWidth(815);
                    } else {
                      setWidth(width - 540);
                    }
                    setSelectedProgramId(p => p.add(newProgram.id));
                  }}
                />
              </AddToList>
              {virtualizedRowProps.columns}
            </RowElement>
          </TableRow>
        )}
      </Draggable>
    );
  };

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(600);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => {
          const virtualizedRowProps = rowCache[rubric.source.index];
          return (
            <RowElement
              ref={provided.innerRef}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.draggableProps}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.dragHandleProps}
              key={virtualizedRowProps.key}
              className={virtualizedRowProps.className}
              style={getItemStyle(
                {
                  margin: 0,
                  border: '3px solid var(--color-neutral-5)',
                  maxWidth: '100%',
                  textAlign: 'left',
                },
                snapshot.isDragging,
                provided.draggableProps.style,
              )}
            >
              {virtualizedRowProps.columns}
            </RowElement>
          );
        }}
      >
        {provided => (
          <AutoSizer>
            {() => (
              <Table
                tableId="reactVirtaualizedTable"
                rowIdKey="position"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
                rowCount={programs.count}
                width={width}
                height={height}
                header
                headerHeight={60}
                rowHeight={45}
                rowGetter={({ index }) => {
                  const p = programs.at(index);
                  if (!p) {
                    return {};
                  }
                  return {
                    ...p,
                    position: `${index + 1}`,
                    startDateTime: formatDateTime(p.startDateTime),
                    endDateTime: formatDateTime(
                      addToDate(p.startDateTime, p.duration),
                    ),
                    duration: secondsToHms(p.duration),
                  };
                }}
                ref={ref => {
                  if (ref) {
                    const whatHasMyLifeComeTo = document.getElementsByClassName(
                      'ReactVirtualized__Grid ReactVirtualized__Table__Grid',
                    )[0];
                    if (whatHasMyLifeComeTo instanceof HTMLElement) {
                      provided.innerRef(whatHasMyLifeComeTo);
                    }
                  }
                }}
                rowRenderer={getRowRender}
                onRowsRendered={() => {
                  const array: string[] = Array.from(selectedProgramId);
                  array.forEach(a => {
                    document.getElementById(a)?.classList.add('active');
                  });
                }}
                // eslint-disable-next-line react/no-unstable-nested-components
                noRowsRenderer={() => (
                  <LoaderContainer
                    display={
                      localStorage.getItem('current-filename') ? 'flex' : 'none'
                    }
                  >
                    <BeatLoader color="var(--color-neutral-3)" />
                  </LoaderContainer>
                )}
              >
                <Column
                  label={
                    <>
                      <Checkbox
                        onClick={() => {
                          setToggleClass(false);
                          setSelectedProgramId(p => {
                            if (p.size === programs.toArray().length) {
                              return new Set();
                            }
                            const idsList: string[] = [];
                            programs.toArray().forEach(prog => {
                              const ref = prog.id;
                              idsList.push(ref);
                              return idsList;
                            });
                            Array.from(
                              document.querySelectorAll(
                                '.ReactVirtualized__Table__row',
                              ),
                            ).forEach(el => el.classList.add('active'));
                            return new Set(idsList);
                          });
                        }}
                        checked={
                          programs.toArray().length > 0 &&
                          programs.toArray().length === selectedProgramId.size
                        }
                      />
                      <span style={{ paddingLeft: '35px' }}>#</span>
                    </>
                  }
                  key="position"
                  dataKey="position"
                  flexGrow={3}
                  minWidth={90}
                  width={90}
                  maxWidth={90}
                />
                <Column
                  label={t(`program-table:columnLabel_startDateTime`)}
                  dataKey="startDateTime"
                  key="startDateTime"
                  flexGrow={3}
                  minWidth={200}
                  width={200}
                  maxWidth={200}
                />
                <Column
                  label={t(`program-table:columnLabel_endDateTime`)}
                  key="endDateTime"
                  dataKey="endDateTime"
                  flexGrow={3}
                  minWidth={200}
                  width={200}
                  maxWidth={200}
                />
                <Column
                  label={t(`program-table:columnLabel_duration`)}
                  dataKey="duration"
                  key="duration"
                  flexGrow={3}
                  minWidth={85}
                  width={85}
                  maxWidth={85}
                />
                <Column
                  label={t(`program-table:columnLabel_title`)}
                  dataKey="title"
                  key="title"
                  flexGrow={3}
                  minWidth={150}
                  width={300}
                  maxWidth={300}
                />
                <Column
                  label={t(`program-table:columnLabel_rating`)}
                  key="rating"
                  dataKey="rating"
                  flexGrow={3}
                  minWidth={230}
                  width={230}
                  maxWidth={230}
                />
                <Column
                  className="container"
                  label={t(`program-table:columnLabel_description`)}
                  dataKey="description"
                  key="description"
                  flexGrow={3}
                  minWidth={100}
                  width={705}
                />
              </Table>
            )}
          </AutoSizer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default VTable;
