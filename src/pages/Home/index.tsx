import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ProgramTable, Menu, ProgramTableRefProps } from 'components';
import { Program } from 'services/epg';
import { EntityMap } from 'utils';

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
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setPageWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
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
    const addedProgram = new Program();
    setPrograms(p => p.add(addedProgram).clone());
    setSelectedProgramId(addedProgram.id);
    setTimeout(() => programTableRef.current.scrollToSelected?.(), 100);
  }, []);

  const handleClearProgramList = useCallback(() => {
    setPrograms(new EntityMap<Program>());
  }, []);

  return (
    <Container overflow={pageWidth >= 1230 ? 'hidden' : 'auto'}>
      <HeaderContainer>
        <Header
          programs={programs}
          setPrograms={newPrograms => {
            setSelectedProgramId('');
            setPrograms(new EntityMap(newPrograms));
          }}
          setSelectedProgramId={setSelectedProgramId}
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
            hasChange={hasChanges}
            setHasChanges={setHasChanges}
            overflowStatus={selectedProgramId === '' ? 'hidden' : 'auto'}
            minWidth={selectedProgramId === '' ? '0px' : '500px'}
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
