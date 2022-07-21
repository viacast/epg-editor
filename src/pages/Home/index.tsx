import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ProgramTable, Menu, ProgramTableRefProps } from 'components';
import { Program } from 'services/epg';
import { addToDate, EntityMap } from 'utils';

import { LocalStorageKeys, useLocalStorage } from 'hooks';
import {
  Container,
  HeaderContainer,
  MenuContainer,
  TableContainer,
  TableMenuContainer,
} from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const [selectedProgramId, setSelectedProgramId] = useState<Set<string>>(
    new Set(),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const programTableRef = useRef<ProgramTableRefProps>({});
  const [savedPrograms, setSavedPrograms] = useLocalStorage(
    LocalStorageKeys.CURRENT_PROGRAMS,
    [] as Program[],
  );
  const [programs, setPrograms] = useState(
    new EntityMap<Program>(savedPrograms?.map(p => new Program(p))),
  );

  useEffect(() => {
    setSavedPrograms(programs.toArray());
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
    setSelectedProgramId(p => p.add(addedProgram.id));
    setTimeout(() => programTableRef.current.scrollToSelected?.(), 100);
  }, [programs]);

  const handleClearProgramList = useCallback(() => {
    setSelectedProgramId(new Set());
    setPrograms(new EntityMap<Program>());
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          setNewPrograms={newPrograms => {
            setSelectedProgramId(new Set());
            setPrograms(newPrograms);
          }}
          handleAddProgram={handleAddProgram}
          handleClearProgramList={handleClearProgramList}
        />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          className="epg-table-menu-content"
          width={selectedProgramId.size === 1 ? 'calc(100% - 535px)' : '100%'}
        >
          <ProgramTable
            forwardRef={programTableRef}
            setSelectedProgramId={setSelectedProgramId}
            selectedProgramId={selectedProgramId}
            setPrograms={setPrograms}
            programs={programs}
          />
        </TableContainer>
        <MenuContainer
          className="epg-table-menu-content"
          width={selectedProgramId.size === 1 ? '500px' : '0px'}
        >
          <Menu
            hasChanges={hasChanges}
            setHasChanges={setHasChanges}
            programs={programs}
            selectedProgramId={selectedProgramId}
            setSelectedProgramId={setSelectedProgramId}
            onSaveProgram={program => {
              setPrograms(p => p.update(program).clone());
              setHasChanges(false);
            }}
            handleRemoveProgram={programId => {
              setPrograms(p => {
                const size = p.toArray().length;
                const index = p.indexOf(programId);
                const idList: Set<string> = new Set();
                if (size === 1) {
                  // was the only program on the list
                  setSelectedProgramId(new Set());
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
