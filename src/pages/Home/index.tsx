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
  const [selectedProgramId, setSelectedProgramId] = useState('');
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
    setSelectedProgramId(addedProgram.id);
    setTimeout(() => programTableRef.current.scrollToSelected?.(), 100);
  }, [programs]);

  const handleClearProgramList = useCallback(() => {
    setSelectedProgramId('');
    setPrograms(new EntityMap<Program>());
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          setPrograms={newPrograms => {
            setSelectedProgramId('');
            setPrograms(newPrograms);
          }}
          handleAddProgram={handleAddProgram}
          handleClearProgramList={handleClearProgramList}
        />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          className="epg-table-menu-content"
          width={selectedProgramId === '' ? '100%' : 'calc(100% - 535px)'}
        >
          <ProgramTable
            forwardRef={programTableRef}
            setSelectedProgramId={setSelectedProgramId}
            selectedProgramId={selectedProgramId}
            programs={programs}
          />
        </TableContainer>
        <MenuContainer
          className="epg-table-menu-content"
          width={selectedProgramId === '' ? '0px' : '500px'}
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
                if (size === 1) {
                  // was the only program on the list
                  setSelectedProgramId('');
                } else if (index === size - 1) {
                  // was the last program on the list
                  setSelectedProgramId(p.at(index - 1)?.id ?? '');
                } else {
                  // all other cases
                  setSelectedProgramId(p.at(index + 1)?.id ?? '');
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
