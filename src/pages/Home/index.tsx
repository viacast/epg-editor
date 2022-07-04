import React, { useEffect, useState } from 'react';

import { ProgramTable } from 'components';
import { Program } from 'services/epg';
import Menu from 'components/Menu';
import { EntityMap } from 'utils';

import {
  Container,
  HeaderContainer,
  MenuContainer,
  TableContainer,
  TableMenuContainer,
} from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const [programs, setPrograms] = useState(new EntityMap<Program>());
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handlePageRefresh = e => {
      if (!programs.count) {
        return;
      }
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handlePageRefresh);
    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, [programs.count]);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          setPrograms={newPrograms => setPrograms(new EntityMap(newPrograms))}
          handleAddProgram={() => {
            const addedProgram = new Program();
            setPrograms(p => p.add(addedProgram).clone());
            setSelectedProgramId(addedProgram.id);
          }}
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
              setPrograms(p => p.remove(programId).clone());
              setSelectedProgramId('');
            }}
          />
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
