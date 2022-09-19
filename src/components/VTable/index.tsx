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
import { useModalProvider } from 'providers/ModalProvider';
import {
  ParentalGuidanceCells,
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
  startWidth: number;
  programs: EntityMap<Program>;
  selectedProgramId: Set<string>;
  setPrograms: React.Dispatch<React.SetStateAction<EntityMap<Program>>>;
  setSelectedProgramId: React.Dispatch<React.SetStateAction<Set<string>>>;
  setToggleClass: (val: boolean) => void;
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
  startWidth,
  programs,
  selectedProgramId,
  setPrograms,
  setToggleClass,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<Record<string, EPGValidationMessages>>(
    {},
  );
  const { openModal } = useModalProvider();
  const [firstProg, setFirstProg] = useState(Array.from(selectedProgramId)[0]);

  useEffect(() => {
    if (selectedProgramId.size === 1) {
      setFirstProg(Array.from(selectedProgramId)[0]);
    }
  }, [selectedProgramId]);

  // Delete all selected programs
  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        openModal({
          title: t('header:titleDeleteProgram', {
            count: selectedProgramId.size,
          }),
          content: t('header:deleteProgramFromList'),
          confirm: () => {
            Array.from(selectedProgramId).forEach(pid => {
              selectedProgramId.delete(pid);
              setPrograms(p => p.remove(pid).clone());
            });
          },
        });
      }
    });
  }, [openModal, selectedProgramId, setPrograms, t]);

  useEffect(() => {
    setAlerts(EPGValidator.validate(programs.toArray()));
  }, [programs]);

  const getRowRender = useCallback(
    virtualizedRowProps => {
      const program = programs.at(virtualizedRowProps.index);

      if (!program) {
        return null;
      }

      rowCache[virtualizedRowProps.index] = virtualizedRowProps;
      // eslint-disable-next-line no-param-reassign
      virtualizedRowProps.columns[5] = (
        <ParentalGuidanceCells
          className="epg-pg"
          title={t(
            `parental-guidance:rating_${virtualizedRowProps.columns[5].props.title}`,
          )}
        >
          <IconRating
            src={rate[virtualizedRowProps.columns[5].props.title]}
            alt={virtualizedRowProps.columns[5].props.title}
          />
          <Message>
            {t(
              `parental-guidance:rating_${virtualizedRowProps.columns[5].props.title}`,
            )}
          </Message>
        </ParentalGuidanceCells>
      );

      let showError = false;
      let showWarn = false;
      let showInfo = false;

      if (alerts[program.id]?.ERROR.length) {
        showError = true;
      }

      if (!showError && alerts[program.id]?.WARN.length) {
        showWarn = true;
      }

      if (!showError && !showWarn && alerts[program.id]?.INFO.length) {
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
              key={program.id}
              hover
              onClick={e => {
                setSelectedProgramId(s => {
                  const newSelectedProgramId = new Set(s);
                  if (!e.ctrlKey) {
                    newSelectedProgramId.clear();
                  }
                  if (newSelectedProgramId.has(program.id)) {
                    newSelectedProgramId.delete(program.id);
                  } else {
                    newSelectedProgramId.add(program.id);
                  }
                  if (e.shiftKey) {
                    if (s.size !== 0) {
                      let startSelection = 0;
                      let endSelection = 0;
                      const lastProg: string = program.id;
                      newSelectedProgramId.add(program.id);
                      if (
                        programs.indexOf(firstProg) < programs.indexOf(lastProg)
                      ) {
                        startSelection = programs.indexOf(firstProg);
                        endSelection = programs.indexOf(lastProg);
                      } else {
                        startSelection = programs.indexOf(lastProg);
                        endSelection = programs.indexOf(firstProg);
                      }
                      programs.toArray().forEach((p, i) => {
                        if (
                          i >= startSelection &&
                          i <= endSelection &&
                          !newSelectedProgramId.has(p.id)
                        ) {
                          newSelectedProgramId.add(p.id);
                        }
                      });
                    }
                  }
                  if (newSelectedProgramId.size === 1) {
                    setToggleClass(true);
                  } else {
                    setToggleClass(false);
                  }
                  return newSelectedProgramId;
                });
              }}
            >
              <RowElement
                ref={provided.innerRef}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.draggableProps}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.dragHandleProps}
                key={virtualizedRowProps.key}
                className={`${virtualizedRowProps.className} ${
                  selectedProgramId.has(program.id) ? 'active' : ''
                }`}
                style={getItemStyle(
                  virtualizedRowProps.style,
                  snapshot.isDragging,
                  provided.draggableProps.style,
                )}
              >
                <Checkbox
                  readOnly
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedProgramId(s => {
                      const newSelectedProgramId = new Set(s);
                      if (newSelectedProgramId.has(program.id)) {
                        newSelectedProgramId.delete(program.id);
                      } else {
                        newSelectedProgramId.add(program.id);
                      }
                      if (newSelectedProgramId.size === 1) {
                        setToggleClass(true);
                      } else {
                        setToggleClass(false);
                      }
                      return newSelectedProgramId;
                    });
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
                      let startDateTime = new Date();
                      if (programs.toArray().indexOf(program) === 0) {
                        startDateTime = addToDate(program.startDateTime, -3600);
                      } else {
                        startDateTime = program.startDateTime;
                      }
                      const newProgram = new Program({
                        duration: 3600,
                        startDateTime,
                      });
                      setPrograms(p => p.add(newProgram, program.id).clone());
                      setToggleClass(true);
                      setSelectedProgramId(s => {
                        const newSelectedProgramId = new Set(s);
                        newSelectedProgramId.clear();
                        newSelectedProgramId.add(newProgram.id);
                        return newSelectedProgramId;
                      });
                    }}
                  />
                </AddToList>
                {virtualizedRowProps.columns}
              </RowElement>
            </TableRow>
          )}
        </Draggable>
      );
    },
    [
      alerts,
      firstProg,
      programs,
      selectedProgramId,
      setPrograms,
      setSelectedProgramId,
      setToggleClass,
      t,
    ],
  );

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return;
      }
      setPrograms(p => {
        const sourceKey = p.at(result.source.index)?.id;
        let targetKey = p.at(result.destination.index)?.id;
        if (
          result.destination.index > result.source.index &&
          result.destination.index < p.count - 1
        ) {
          targetKey = p.at(result.destination.index + 1)?.id;
        }
        if (!sourceKey || !targetKey) {
          return p;
        }
        if (result.destination.index === p.count - 1) {
          return p.moveEnd(sourceKey).clone();
        }
        return p.moveTo(sourceKey, targetKey).clone();
      });
    },
    [setPrograms],
  );

  return (
    <div
      className="div-bem-legal"
      style={{
        outline: '1px solid red',
        height: '100%',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
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
              {({ width, height }) => (
                <Table
                  tableId="reactVirtaualizedTable"
                  rowIdKey="position"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.droppableProps}
                  rowCount={programs.count}
                  width={width || startWidth}
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
                      const triggerRf = document.getElementsByClassName(
                        'ReactVirtualized__Grid ReactVirtualized__Table__Grid',
                      )[0];
                      if (triggerRf instanceof HTMLElement) {
                        provided.innerRef(triggerRf);
                      }
                    }
                  }}
                  rowRenderer={getRowRender}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  noRowsRenderer={() => (
                    <LoaderContainer
                      display={programs.count !== 0 ? 'flex' : 'none'}
                    >
                      <BeatLoader color="var(--color-neutral-3)" />
                    </LoaderContainer>
                  )}
                >
                  <Column
                    label={
                      <>
                        <Checkbox
                          readOnly
                          onClick={() => {
                            setToggleClass(false);
                            setSelectedProgramId(p => {
                              if (p.size === programs.toArray().length) {
                                return new Set();
                              }
                              return new Set(
                                programs.toArray().map(program => program.id),
                              );
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
                    minWidth={170}
                    width={190}
                    maxWidth={190}
                  />
                  <Column
                    label={t(`program-table:columnLabel_endDateTime`)}
                    key="endDateTime"
                    dataKey="endDateTime"
                    flexGrow={3}
                    minWidth={170}
                    width={190}
                    maxWidth={190}
                  />
                  <Column
                    label={t(`program-table:columnLabel_duration`)}
                    dataKey="duration"
                    key="duration"
                    flexGrow={3}
                    minWidth={85}
                    width={110}
                    maxWidth={110}
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
                    minWidth={150}
                    width={705}
                  />
                </Table>
              )}
            </AutoSizer>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default VTable;
