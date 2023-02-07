import React, { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { IconButton, TableRow } from '@mui/material';
import { HiPlus } from 'react-icons/hi';
import { IoIosAlert, IoIosInformationCircle } from 'react-icons/io';
import { BeatLoader } from 'react-spinners';
import { RiAlertFill } from 'react-icons/ri';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';

import { EPGValidator, Program } from 'services/epg';
import {
  addToDate,
  EntityMap,
  formatDateTime,
  secondsToHms,
  ReactSetState,
} from 'utils';
import {
  EPGValidationMessagesByProgram,
  EPGValidationMessageType,
} from 'services/epg/validator';
import { useModalProvider } from 'providers/ModalProvider';
import { ColorPallete } from 'styles/global';

import {
  ParentalGuidanceCells,
  IconRating,
  Message,
  RowElement,
  AddToList,
  Checkbox,
  ValidationMessage,
  MessagesContainer,
  LoaderContainer,
} from './styles';

export interface ProgramTableProps {
  startWidth: number;
  tableHeight: number;
  programs: EntityMap<Program>;
  selectedProgramId: Set<string>;
  setPrograms: ReactSetState<EntityMap<Program>>;
  setSelectedProgramId: ReactSetState<Set<string>>;
}

const getItemStyle = (style, isDragging, draggableStyle) => ({
  position: 'relative',
  userSelect: 'none',
  textAlign: 'left',
  color: ColorPallete.NEUTRAL_2,
  fontFamily: 'Nunito, sans-serif',
  background: ColorPallete.NEUTRAL_6,
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

const VirtualizedTable: React.FC<ProgramTableProps> = ({
  startWidth,
  tableHeight,
  programs,
  selectedProgramId,
  setPrograms,
  setSelectedProgramId,
}) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(
    {} as EPGValidationMessagesByProgram,
  );
  const { openModal } = useModalProvider();
  const [firstProg, setFirstProg] = useState(Array.from(selectedProgramId)[0]);

  useEffect(() => {
    if (selectedProgramId.size === 1) {
      setFirstProg(Array.from(selectedProgramId)[0]);
    }
  }, [selectedProgramId]);

  useEffect(() => {
    const handleDeselect = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProgramId(new Set());
      }
    };
    document.addEventListener('keydown', handleDeselect);
    return () => {
      document.removeEventListener('keydown', handleDeselect);
    };
  });

  useEffect(() => {
    const handleDelete = (e: KeyboardEvent) => {
      const targetTag = (e?.target as Element).tagName.toLocaleLowerCase();
      if (
        e.key === 'Delete' &&
        targetTag !== 'input' &&
        targetTag !== 'textarea' &&
        selectedProgramId.size
      ) {
        openModal({
          title: t('header:titleDeleteProgram', {
            count: selectedProgramId.size,
          }),
          content: t('header:deleteProgramFromList'),
          confirm: () => {
            Array.from(selectedProgramId).forEach(pid => {
              const size = programs.toArray().length;
              const index = programs.indexOf(pid);
              const idList: Set<string> = new Set();
              if (size === 1) {
                // was the only program on the list
                selectedProgramId.delete(pid);
              } else if (index === size - 1) {
                // was the last program on the list
                idList.add(programs.at(index - 1)?.id ?? '');
                setSelectedProgramId(idList);
              } else {
                // all other cases
                idList.add(programs.at(index + 1)?.id ?? '');
                setSelectedProgramId(idList);
              }
              setPrograms(p => p.remove(pid).clone());
            });
          },
        });
      }
    };
    document.addEventListener('keydown', handleDelete);
    return () => {
      document.removeEventListener('keydown', handleDelete);
    };
  }, [
    openModal,
    programs,
    selectedProgramId,
    setPrograms,
    setSelectedProgramId,
    t,
  ]);

  useEffect(() => {
    setMessages(EPGValidator.validate(programs.toArray()));
  }, [programs]);

  const getRowRender = useCallback(
    virtualizedRowProps => {
      const program = programs.at(virtualizedRowProps.index);

      if (!program || !messages || !messages[program.id]) {
        return null;
      }
      const validators = Array.from(messages[program.id].ALL);

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
          <Message className="epg-pg-text">
            {t(
              `parental-guidance:rating_${virtualizedRowProps.columns[5].props.title}`,
            )}
          </Message>
        </ParentalGuidanceCells>
      );

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
              style={{
                opacity: validators.includes(
                  EPGValidationMessageType.PAST_START_DATE,
                )
                  ? 0.5
                  : 1,
              }}
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
                <div
                  style={{
                    position: 'fixed',
                    top: `${tableHeight}px`,
                    zIndex: '2',
                    width: '100%',
                    height: '3px',
                    backgroundColor: 'var(--color-system-1)',
                  }}
                />
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
                      return newSelectedProgramId;
                    });
                  }}
                  checked={selectedProgramId.has(program.id)}
                />
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
                      setSelectedProgramId(s => {
                        const newSelectedProgramId = new Set(s);
                        newSelectedProgramId.clear();
                        newSelectedProgramId.add(newProgram.id);
                        return newSelectedProgramId;
                      });
                    }}
                  />
                </AddToList>
                {virtualizedRowProps.columns.map((cell, index) => {
                  let rowCell;
                  if (index === 0) {
                    rowCell = cell;
                  } else if (index === 1) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.FAR_START_DATE,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <IoIosInformationCircle
                                  size="20px"
                                  color={ColorPallete.NEUTRAL_3}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  } else if (index === 2) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.TIME_GAP,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <IoIosAlert
                                  size="20px"
                                  color={ColorPallete.SYSTEM_1}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  } else if (index === 3) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.INVALID_DURATION,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <IoIosAlert
                                  size="20px"
                                  color={ColorPallete.SYSTEM_1}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  } else if (index === 4) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.EMPTY_TITLE,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <IoIosAlert
                                  size="20px"
                                  color={ColorPallete.SYSTEM_1}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  } else if (index === 5) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.NO_PARENTAL_RATING,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <RiAlertFill
                                  size="20px"
                                  color={ColorPallete.SYSTEM_2}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  } else if (index === 6) {
                    rowCell = (
                      <>
                        <MessagesContainer>
                          {validators.includes(
                            EPGValidationMessageType.EMPTY_DESCRIPTION,
                          ) && (
                            <ValidationMessage>
                              <IconButton>
                                <IoIosAlert
                                  size="20px"
                                  color={ColorPallete.SYSTEM_1}
                                />
                              </IconButton>
                            </ValidationMessage>
                          )}
                        </MessagesContainer>
                        {cell}
                      </>
                    );
                  }
                  return rowCell;
                })}
              </RowElement>
            </TableRow>
          )}
        </Draggable>
      );
    },
    [
      programs,
      messages,
      t,
      selectedProgramId,
      tableHeight,
      setSelectedProgramId,
      firstProg,
      setPrograms,
    ],
  );

  const onDragEnd = useCallback(
    result => {
      if (!result.destination) {
        return;
      }
      if (result.source.index === result.destination.index) {
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
          return p.moveTo(sourceKey).clone();
        }
        return p.moveTo(sourceKey, targetKey).clone();
      });
    },
    [setPrograms],
  );

  const renderLoading = useCallback(() => {
    return (
      programs.count > 0 && (
        <LoaderContainer>
          <BeatLoader color={ColorPallete.NEUTRAL_3} />
        </LoaderContainer>
      )
    );
  }, [programs.count]);

  return (
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
                  minWidth: '1210px',
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
                noRowsRenderer={() => renderLoading()}
              >
                <Column
                  label={
                    <>
                      <Checkbox
                        readOnly
                        onClick={() => {
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
                  flexGrow={1}
                  minWidth={90}
                  width={90}
                  maxWidth={90}
                />
                <Column
                  label={t(`program-table:columnLabel_startDateTime`)}
                  dataKey="startDateTime"
                  key="startDateTime"
                  flexGrow={1}
                  minWidth={170}
                  width={190}
                  maxWidth={190}
                />
                <Column
                  label={t(`program-table:columnLabel_endDateTime`)}
                  key="endDateTime"
                  dataKey="endDateTime"
                  flexGrow={1}
                  minWidth={170}
                  width={190}
                  maxWidth={190}
                />
                <Column
                  label={t(`program-table:columnLabel_duration`)}
                  dataKey="duration"
                  key="duration"
                  flexGrow={1}
                  minWidth={85}
                  width={110}
                  maxWidth={110}
                />
                <Column
                  label={t(`program-table:columnLabel_title`)}
                  dataKey="title"
                  key="title"
                  flexGrow={1}
                  minWidth={150}
                  width={300}
                  maxWidth={300}
                />
                <Column
                  label={t(`program-table:columnLabel_rating`)}
                  key="rating"
                  dataKey="rating"
                  flexGrow={1}
                  minWidth={230}
                  width={230}
                  maxWidth={230}
                />
                <Column
                  className="container"
                  label={t(`program-table:columnLabel_description`)}
                  dataKey="description"
                  key="description"
                  flexGrow={1}
                  minWidth={150}
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

export default VirtualizedTable;
