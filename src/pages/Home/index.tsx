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
  const [isClosing, setIsClosing] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const programTableRef = useRef<ProgramTableRefProps>({});

  const [savedPrograms, setSavedPrograms] = useLocalStorage(
    LocalStorageKeys.CURRENT_PROGRAMS,
    [] as Program[],
  );
  const [programs, setPrograms] = useState(
    new EntityMap<Program>(savedPrograms?.map(p => new Program(p))),
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
    <Container overflow={dimensions.width > 1768 ? 'hidden' : 'scrool'}>
      <HeaderContainer>
        <Header
          setIsClosing={setIsClosing}
          setHasChange={setHasChange}
          programs={programs}
          setPrograms={newPrograms => {
            setSelectedProgramId('');
            setPrograms(new EntityMap(newPrograms));
          }}
          handleAddProgram={handleAddProgram}
          handleClearProgramList={handleClearProgramList}
        />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          className="epg-tableMenuContent"
          width={
            selectedProgramId === '' || isClosing
              ? '100%'
              : 'calc(100% - 535px)'
          }
        >
          <ProgramTable
            forwardRef={programTableRef}
            setSelectedProgramId={setSelectedProgramId}
            selectedProgramId={selectedProgramId}
            programs={programs}
          />
        </TableContainer>
        <MenuContainer
          className="epg-tableMenuContent"
          onTransitionEnd={() => {
            if (!isClosing) {
              return;
            }
            setSelectedProgramId('');
            setIsClosing(false);
          }}
          width={selectedProgramId === '' || isClosing ? '0px' : '500px'}
        >
          <Menu
            hasChange={hasChange}
            setHasChange={setHasChange}
            overflowStatus={
              selectedProgramId === '' || isClosing ? 'hidden' : 'auto'
            }
            minWidth={selectedProgramId === '' || isClosing ? '0px' : '500px'}
            programs={programs}
            selectedProgramId={selectedProgramId}
            setIsClosing={setIsClosing}
            onSaveProgram={program =>
              setPrograms(p => p.update(program).clone())
            }
            handleRemoveProgram={programId => {
              setPrograms(p => {
                const size = p.toArray().length;
                const index = p.indexOf(programId);
                if (index === 0) {
                  setSelectedProgramId('');
                } else if (size - 1 === index) {
                  setSelectedProgramId(p.at(index - 1).id);
                } else {
                  setSelectedProgramId(p.at(index + 1).id);
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
