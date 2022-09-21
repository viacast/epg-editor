import React, { useCallback, useEffect, useState } from 'react';

import { Menu, VirtualizedTable } from 'components';
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
        />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          className="epg-table-menu-content"
          width={selectedProgramId.size !== 1 ? '100%' : 'calc(100% - 535px)'}
        >
          <VirtualizedTable
            startWidth={tableWidth}
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
          <Menu
            programs={programs}
            hasChanges={hasChanges}
            setHasChanges={setHasChanges}
            setSelectedProgramId={setSelectedProgramId}
            onSaveProgram={program => {
              setPrograms(p => p.update(program).clone());
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
                    dimension.width - 60 <= 1210 ? 1210 : dimension.width - 60,
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
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
