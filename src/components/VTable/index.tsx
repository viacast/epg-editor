import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Table, Column, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { Program, ProgramRating } from 'services/epg';
import {
  addToDate,
  EntityMap,
  formatDateTime,
  hmsToSeconds,
  parseDate,
  secondsToHms,
} from 'utils';

import IconSC from 'assets/icons/ratings/SC.svg';
import IconRL from 'assets/icons/ratings/RL.svg';
import IconR10 from 'assets/icons/ratings/R10.svg';
import IconR12 from 'assets/icons/ratings/R12.svg';
import IconR14 from 'assets/icons/ratings/R14.svg';
import IconR16 from 'assets/icons/ratings/R16.svg';
import IconR18 from 'assets/icons/ratings/R18.svg';
import { IconButton, TableRow } from '@mui/material';
import { HiPlus } from 'react-icons/hi';

import { BeatLoader } from 'react-spinners';
import { IoIosAlert, IoIosInformationCircle } from 'react-icons/io';
import { RiAlertFill } from 'react-icons/ri';
import {
  IconRating,
  Message,
  RowElement,
  AddToList,
  Checkbox,
  Alerts,
  AlertsGroup,
  LoaderContainer,
  Text,
} from './styles';

export interface ProgramTableProps {
  flag: boolean;
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

const reorder = (
  list: {
    position: string;
    startDateTime: string;
    endDateTime: string;
    duration: string;
    title: string;
    rating: string;
    description: string;
  }[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const adjusted: {
    position: string;
    startDateTime: string;
    endDateTime: string;
    duration: string;
    title: string;
    rating: string;
    description: string;
  }[] = [];
  result.forEach((p, i) => {
    adjusted.push({
      ...p,
      position: `${i + 1}`,
    });
  });

  return adjusted;
};

const rowCache = {};

const ratings = {
  RSC: ProgramRating.RSC,
  RL: ProgramRating.RL,
  R10: ProgramRating.R10,
  R12: ProgramRating.R12,
  R14: ProgramRating.R14,
  R16: ProgramRating.R16,
  R18: ProgramRating.R18,
};

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
  flag,
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

  const getItemStyle = (style, isDragging, draggableStyle) => ({
    position: 'relative',
    userSelect: 'none',
    textAlign: 'left',
    color: 'var(--color-neutral-2)',
    fontFamily: 'Nunito, sans-serif',
    background: isDragging
      ? 'var(--color-primary-2)'
      : 'var(--color-neutral-6)',
    cursor: isDragging ? 'grabbing' : 'grab',
    ...draggableStyle,
    ...style,
  });

  const adjustPosition = (
    items: {
      position: string;
      startDateTime: string;
      endDateTime: string;
      duration: string;
      title: string;
      rating: string;
      description: string;
    }[],
  ): Program[] => {
    const adjusted: Program[] = [];
    items.forEach(p => {
      adjusted.push(
        new Program({
          startDateTime: parseDate(p.startDateTime),
          duration: hmsToSeconds(p.duration),
          title: p.title,
          rating: ratings[p.rating],
          description: p.description,
        }),
      );
    });
    return adjusted;
  };

  const Progams: {
    position: string;
    startDateTime: string;
    endDateTime: string;
    duration: string;
    title: string;
    rating: string;
    description: string;
  }[] = [];

  const [items, setItems] = useState(Progams);

  useEffect(() => {
    if (flag) {
      items.splice(0, items.length);
      setItems(items);
      setPrograms(new EntityMap<Program>(adjustPosition(items)));
    }
  }, [flag]);

  useEffect(() => {
    items.splice(0, items.length);
    setItems(items);
    if (programs.toArray().length > 0) {
      programs.toArray().map((p, index) => {
        const aux = {
          position: `${index + 1}`,
          startDateTime: formatDateTime(p.startDateTime),
          endDateTime: formatDateTime(addToDate(p.startDateTime, p.duration)),
          duration: secondsToHms(p.duration),
          title: p.title,
          rating: p.rating,
          description: p.description,
        };
        return items.push(aux);
      });
      setItems(items);
    }
  }, [items, programs]);

  useEffect(() => {
    if (toggleClass === false && selectedProgramId.size === 0) {
      Array.from(document.querySelectorAll('.active')).forEach(el =>
        el.classList.remove('active'),
      );
    }
  }, [toggleClass, selectedProgramId]);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(newItems);
    setPrograms(new EntityMap<Program>(adjustPosition(newItems)));
  };

  const getRowRender = virtualizedRowProps => {
    const item = items[virtualizedRowProps.index];

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
    return (
      <Draggable
        draggableId={item.position}
        index={virtualizedRowProps.index}
        key={item.position}
      >
        {(provided, snapshot) => (
          <TableRow
            hover
            onClick={e => {
              const ref: string =
                programs.toArray()[Number(item.position) - 1].id;
              const aux = selectedProgramId;
              if (e.ctrlKey) {
                if (selectedProgramId.has(ref)) {
                  aux.delete(ref);
                  document.getElementById(ref)?.classList.remove('active');
                } else {
                  aux.add(ref);
                  document.getElementById(ref)?.classList.add('active');
                }
                if (aux.size === 1) {
                  setToggleClass(true);
                } else {
                  setToggleClass(false);
                }
                setSelectedProgramId(aux);
              } else if (!e.ctrlKey) {
                if (selectedProgramId.has(ref)) {
                  aux.delete(ref);
                  document.getElementById(ref)?.classList.remove('active');
                } else {
                  aux.clear();
                  aux.add(ref);
                  Array.from(document.querySelectorAll('.active')).forEach(el =>
                    el.classList.remove('active'),
                  );
                  document.getElementById(ref)?.classList.add('active');
                  setSelectedProgram(programs.get(ref) ?? new Program());
                }
                if (aux.size === 1) {
                  setToggleClass(true);
                } else {
                  setToggleClass(false);
                }
                setSelectedProgramId(aux);
              }
            }}
          >
            <RowElement
              id={programs.toArray()[Number(item.position) - 1].id}
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
                  const ref: string =
                    programs.toArray()[Number(item.position) - 1].id;
                  const aux = selectedProgramId;
                  if (selectedProgramId.has(ref)) {
                    aux.delete(ref);
                    document.getElementById(ref)?.classList.remove('active');
                  } else {
                    aux.add(ref);
                    document.getElementById(ref)?.classList.add('active');
                  }
                  if (aux.size === 1) {
                    setToggleClass(true);
                  } else {
                    setToggleClass(false);
                  }
                  setSelectedProgramId(aux);
                }}
                checked={selectedProgramId.has(
                  programs.toArray()[Number(item.position) - 1].id,
                )}
              />{' '}
              <AlertsGroup>
                <Alerts
                  display={
                    item.title === '' ||
                    item.description === '' ||
                    item.duration === '0' ||
                    (Number(item.position) > 1 &&
                      new Date(
                        programs.toArray()[Number(item.position)].startDateTime,
                      ).getTime() !==
                        addToDate(
                          new Date(
                            programs.toArray()[
                              Number(item.position) - 1
                            ].startDateTime,
                          ),
                          Number(
                            programs.toArray()[Number(item.position) - 1]
                              .duration,
                          ),
                        ).getTime())
                      ? 'block'
                      : 'none'
                  }
                >
                  <IconButton>
                    <IoIosAlert size="20px" color="var(--color-system-1)" />
                  </IconButton>
                </Alerts>
                <Alerts
                  display={
                    item.title !== '' &&
                    item.description !== '' &&
                    item.duration !== '0' &&
                    new Date(
                      programs.toArray()[Number(item.position)].startDateTime,
                    ).getTime() ===
                      addToDate(
                        new Date(
                          programs.toArray()[
                            Number(item.position) - 1
                          ].startDateTime,
                        ),
                        Number(
                          programs.toArray()[Number(item.position) - 1]
                            .duration,
                        ),
                      ).getTime() &&
                    (item.rating === ProgramRating.RSC ||
                      new Date(
                        programs.toArray()[Number(item.position)].startDateTime,
                      ) < new Date())
                      ? 'block'
                      : 'none'
                  }
                >
                  <IconButton>
                    <RiAlertFill size="20px" color="var(--color-system-2)" />
                  </IconButton>
                </Alerts>
                <Alerts
                  display={
                    item.title !== '' &&
                    item.description !== '' &&
                    item.duration !== '0' &&
                    new Date(
                      programs.toArray()[Number(item.position)].startDateTime,
                    ).getTime() ===
                      addToDate(
                        new Date(
                          programs.toArray()[
                            Number(item.position) - 1
                          ].startDateTime,
                        ),
                        Number(
                          programs.toArray()[Number(item.position) - 1]
                            .duration,
                        ),
                      ).getTime() &&
                    item.rating !== ProgramRating.RSC &&
                    new Date(
                      programs.toArray()[Number(item.position)].startDateTime,
                    ) > new Date() &&
                    new Date(
                      programs.toArray()[Number(item.position)].startDateTime,
                    ) >= addToDate(new Date(), 2592000)
                      ? 'block'
                      : 'none'
                  }
                >
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
                    const ref: Program =
                      programs.toArray()[Number(item.position) - 1];
                    const newProgram = new Program({
                      duration: 3600,
                      startDateTime: ref.startDateTime,
                    });
                    setPrograms(p => p.add(newProgram, ref.id).clone());
                    if (width - 540 <= 815) {
                      setWidth(815);
                    } else {
                      setWidth(width - 540);
                    }
                    setSelectedProgramId(p => p.add(newProgram.id));
                  }}
                  style={{
                    color: 'var(--color-neutral-2)',
                    width: '15px',
                    height: '50px',
                    position: 'relative',
                    marginLeft: '15px',
                    zIndex: '3',
                    cursor: 'pointer',
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
                  border: '5px solid var(--color-neutral-5)',
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
                rowCount={items.length}
                width={width}
                height={height}
                headerHeight={60}
                rowHeight={45}
                rowGetter={({ index }) => items[index]}
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
                    <Text>Waiting file to render</Text>
                    &emsp;
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
                          programs.toArray().length === selectedProgramId.size
                        }
                      />
                      <span style={{ paddingLeft: '15px' }}>#</span>
                    </>
                  }
                  key="position"
                  dataKey="position"
                  flexGrow={2}
                  minWidth={30}
                  width={50}
                  maxWidth={70}
                />
                <Column
                  label={t(`program-table:columnLabel_startDateTime`)}
                  dataKey="startDateTime"
                  key="startDateTime"
                  flexGrow={2}
                  minWidth={80}
                  width={190}
                  maxWidth={220}
                />
                <Column
                  label={t(`program-table:columnLabel_endDateTime`)}
                  key="endDateTime"
                  dataKey="endDateTime"
                  flexGrow={2}
                  minWidth={80}
                  width={190}
                  maxWidth={220}
                />
                <Column
                  label={t(`program-table:columnLabel_duration`)}
                  dataKey="duration"
                  key="duration"
                  flexGrow={2}
                  minWidth={30}
                  width={60}
                  maxWidth={140}
                />
                <Column
                  label={t(`program-table:columnLabel_title`)}
                  dataKey="title"
                  key="title"
                  flexGrow={2}
                  minWidth={130}
                  width={340}
                  maxWidth={420}
                />
                <Column
                  label={t(`program-table:columnLabel_rating`)}
                  key="rating"
                  dataKey="rating"
                  flexGrow={2}
                  minWidth={170}
                  width={170}
                  maxWidth={270}
                />
                <Column
                  className="container"
                  label={t(`program-table:columnLabel_description`)}
                  dataKey="description"
                  key="description"
                  flexGrow={2}
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
