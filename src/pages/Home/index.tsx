import React, { useCallback, useEffect, useState } from 'react';

import { Menu, MultiMenu, VirtualizedTable } from 'components';
import { Program } from 'services/epg';
import { addToDate, EntityMap } from 'utils';

import { LocalStorageKeys, useLocalStorage, useWindowSize } from 'hooks';
import {
  Container,
  HeaderContainer,
  MenuContainer,
  TableContainer,
  TableMenuContainer,
} from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const dimension = useWindowSize();
  const [selectedProgramId, setSelectedProgramId] = useState<Set<string>>(
    new Set(),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [savedPrograms, setSavedPrograms] = useLocalStorage(
    LocalStorageKeys.CURRENT_PROGRAMS,
    [] as Program[],
  );
  const [programs, setPrograms] = useState(
    new EntityMap<Program>(savedPrograms?.map(p => new Program(p))),
  );
  const [selectedProgram, setSelectedProgram] = useState<Program>();
  const [tableWidth, setTableWidth] = useState(dimension.width - 60);

  const [now, setNow] = useState(0);
  const [current, setCurrent] = useState(new Date());
  const [playedProgramId, setPlayedProgramId] = useState<Set<string>>(
    new Set(),
  );

  let aux = -1;
  const setCursorPosition = () =>
    programs.toArray().forEach(p => {
      if (p.startDateTime <= new Date()) {
        aux += 1;
      }
      setNow(aux);
    });

  setTimeout(() => {
    setCursorPosition();
    setCurrent(new Date());
  }, 1000);

  const plyaing = programs.toArray()[now]; // currently playing program
  let tableHeight = 0; // distance between the top of table body and the timeline
  if (plyaing) {
    const end: number = addToDate(
      plyaing.startDateTime,
      plyaing.duration,
    ).getTime();
    const diff: number = Math.abs((end - current.getTime()) / 1000); // time left to end program
    const length: number = plyaing.duration;
    const partRowSize: number = (1 - diff / length) * 45; // size of part of a row
    const entireRowSize: number = 45 * now; // Size of entire rows
    tableHeight = entireRowSize + partRowSize;
  }

  // useEffect(() => {
  //   const programsArray: Program[] = Object.values(programs);

  //   function compareDates(a: Date, b: Date): number {
  //     if (a?.getTime() < b?.getTime()) {
  //       return -1;
  //     }
  //     if (a?.getTime() > b?.getTime()) {
  //       return 1;
  //     }
  //     return 0;
  //   }

  //   function sortArrayByDate(arr: Program[]): Program[] {
  //     const sortedArray: Program[] = [...arr];

  //     // eslint-disable-next-line no-plusplus
  //     for (let i = 0; i < sortedArray.length - 1; i++) {
  //       // eslint-disable-next-line no-plusplus
  //       for (let j = i + 1; j < sortedArray.length; j++) {
  //         if (
  //           compareDates(
  //             sortedArray[j].startDateTime,
  //             sortedArray[i].startDateTime,
  //           ) < 0
  //         ) {
  //           // Swap elements
  //           const temp = sortedArray[i];
  //           sortedArray[i] = sortedArray[j];
  //           sortedArray[j] = temp;
  //         }
  //       }
  //     }

  //     return sortedArray;
  //   }

  //   const sortedArray = sortArrayByDate(programsArray);

  //   const sortedPrograms: Program[] = Object.values(sortedArray[2]);
  //   const sortedEntityMapPrograms = new EntityMap<Program>(
  //     sortedPrograms?.map(p => new Program(p)),
  //   );
  //   setPrograms(sortedEntityMapPrograms);
  //   console.log(sortedEntityMapPrograms);
  // }, []);

  useEffect(() => {
    const uniqueDataArray: Program[] = [];
    const datesSeen = new Set();

    const programsArray: Program[] = Object.values(programs);
    const arrayofPrograms: Program[] = Object.values(programsArray[2]);

    arrayofPrograms.forEach(a => {
      if (!datesSeen.has(a.startDateTime.getTime())) {
        uniqueDataArray.push(a);
        datesSeen.add(a.startDateTime.getTime());
      }
    });

    const uniqueEntityMapPrograms = new EntityMap<Program>(
      uniqueDataArray?.map(p => new Program(p)),
    );
    setPrograms(uniqueEntityMapPrograms);
  }, []);

  useEffect(() => {
    let j = 0;
    while (j < now) {
      if (programs && programs.toArray().length > 0) {
        setPlayedProgramId(playedProgramId.add(programs.toArray()[j].id));
      }
      j += 1;
    }
  }, [now, playedProgramId, programs]);

  useEffect(() => {
    setSelectedProgram(programs.get(Array.from(selectedProgramId)[0]));
  }, [programs, selectedProgramId]);

  useEffect(() => {
    if (programs.toArray().length !== 0) {
      setSavedPrograms(programs.toArray());
    }
  }, [programs, setSavedPrograms]);

  const handleAddProgram = useCallback(() => {
    let startDateTime = new Date();
    if (programs.count) {
      const programList = programs.toArray();
      const lastProgram = programList[programList.length - 1];
      startDateTime = addToDate(
        lastProgram.startDateTime,
        lastProgram.duration,
      );
    }
    const addedProgram = new Program({
      duration: 3600,
      startDateTime,
    });
    setPrograms(p => p.add(addedProgram).clone());
    setSelectedProgramId(s => {
      const newSelectedProgramId = new Set(s);
      newSelectedProgramId.clear();
      newSelectedProgramId.add(addedProgram.id);
      return newSelectedProgramId;
    });
    if (dimension.width - 600 <= 1210) {
      setTableWidth(1210);
    } else {
      setTableWidth(dimension.width - 600);
    }
    setTimeout(() => {
      const objDiv = document.getElementsByClassName(
        'ReactVirtualized__Grid',
      )[0];
      if (objDiv) {
        objDiv.scroll({ top: objDiv.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
  }, [dimension.width, programs]);

  const handleClearProgramList = useCallback(() => {
    setSelectedProgramId(new Set());
    setPrograms(new EntityMap<Program>());
    setSavedPrograms([] as Program[]);
  }, [setSavedPrograms]);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          setNewPrograms={newPrograms => {
            setSelectedProgramId(new Set());
            setSavedPrograms(newPrograms.toArray());
            setPrograms(newPrograms);
          }}
          handleAddProgram={handleAddProgram}
          handleClearProgramList={handleClearProgramList}
          tableHeight={tableHeight}
          playedProgramId={playedProgramId}
          setPlayedProgramId={setPlayedProgramId}
          setPrograms={setPrograms}
          selectedProgram={selectedProgram}
          selectedProgramId={selectedProgramId}
          setSelectedProgramId={setSelectedProgramId}
        />
      </HeaderContainer>
      {/* <div
        style={{
          width: 'calc(100% - 60px)',
          height: '80px',
          marginTop: '20px',
          marginLeft: '30px',
          paddingLeft: '2.5px',
          borderRadius: '4px',
          backgroundColor: 'var(--color-neutral-5)',
        }}
      >
        <div
          style={{
            position: 'fixed',
            left: `${now}px`,
            zIndex: '2',
            width: '4px',
            height: '80px',
            backgroundColor: 'var(--color-system-1)',
          }}
        />
        {programs.toArray().map(p => {
          const progSize = p.duration;
          const dim = progSize / diffSec;
          const w = `${String(twidth * dim)}px`;
          return (
            <div
              style={{
                display: 'inline-block',
                width: w,
                height: '75px',
                marginTop: '2.5px',
                border: '1px solid var(--color-neutral-6)',
                borderRadius: '2px',
                backgroundColor: 'var(--color-system-3)',
              }}
            />
          );
        })}
      </div> */}
      <TableMenuContainer>
        <TableContainer
          className="epg-table-menu-content"
          width={selectedProgramId.size !== 1 ? '100%' : 'calc(100% - 535px)'}
        >
          <VirtualizedTable
            startWidth={tableWidth}
            tableHeight={tableHeight}
            programs={programs}
            setPrograms={setPrograms}
            selectedProgramId={selectedProgramId}
            setSelectedProgramId={setSelectedProgramId}
          />
        </TableContainer>
        <MenuContainer
          className="epg-table-menu-content"
          width={
            // eslint-disable-next-line no-nested-ternary
            selectedProgramId.size === 1
              ? dimension.width < 1210
                ? '480px'
                : '500px'
              : '0px'
          }
        >
          {selectedProgramId.size === 1 && (
            <Menu
              programs={programs}
              hasChanges={hasChanges}
              setHasChanges={setHasChanges}
              setSelectedProgramId={setSelectedProgramId}
              onSaveProgram={program => {
                setPrograms(p => p.updateProgram(program).clone());
                setHasChanges(false);
              }}
              selectedProgram={selectedProgram ?? new Program()}
              handleRemoveProgram={programId => {
                setPrograms(p => {
                  const size = p.toArray().length;
                  const index = p.indexOf(programId);
                  const idList: Set<string> = new Set();
                  if (size === 1) {
                    // was the only program on the list
                    handleClearProgramList(); // just clear table
                    setTableWidth(
                      dimension.width - 60 <= 1210
                        ? 1210
                        : dimension.width - 60,
                    ); // force menu container to close
                  } else if (index === size - 1) {
                    // was the last program on the list
                    idList.add(p.at(index - 1)?.id ?? '');
                    setSelectedProgramId(idList);
                  } else {
                    // all other cases
                    idList.add(p.at(index + 1)?.id ?? '');
                    setSelectedProgramId(idList);
                  }
                  return p.remove(programId).clone();
                });
              }}
            />
          )}
        </MenuContainer>
        <MenuContainer
          className={`${
            selectedProgramId.size > 1 ? 'aux' : ''
          } epg-table-menu-content`}
          width={
            // eslint-disable-next-line no-nested-ternary
            selectedProgramId.size > 1
              ? dimension.width < 1210
                ? '480px'
                : '500px'
              : '0px'
          }
        >
          {selectedProgramId.size > 1 && (
            <MultiMenu
              programs={programs}
              hasChanges={hasChanges}
              setHasChanges={setHasChanges}
              selectedProgramId={selectedProgramId}
              setSelectedProgramId={setSelectedProgramId}
              onSaveProgram={(progs, fields) => {
                setPrograms(p =>
                  p
                    .updateMany(progs, programs, selectedProgramId, fields)
                    .clone(),
                );
                setHasChanges(false);
              }}
              handleRemoveProgram={programIds => {
                setPrograms(p => {
                  let newPrograms = p;
                  programIds.forEach(programId => {
                    const size = p.toArray().length;
                    const index = p.indexOf(programId);
                    const idList: Set<string> = new Set();
                    if (size === 1) {
                      // was the only program on the list
                      handleClearProgramList(); // just clear table
                      setTableWidth(
                        dimension.width - 60 <= 1210
                          ? 1210
                          : dimension.width - 60,
                      ); // force menu container to close
                    } else if (index === size - 1) {
                      // was the last program on the list
                      idList.add(p.at(index - 1)?.id ?? '');
                      setSelectedProgramId(idList);
                    } else {
                      // all other cases
                      idList.add(p.at(index + 1)?.id ?? '');
                      setSelectedProgramId(idList);
                    }
                    newPrograms = newPrograms.remove(programId).clone();
                  });
                  return newPrograms;
                });
              }}
            />
          )}
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
