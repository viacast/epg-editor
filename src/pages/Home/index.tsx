import React, { useEffect, useState } from 'react';
import { ProgramTable } from 'components';
import { EPGParser, Program } from 'services/epg';
import Menu from 'components/Menu';
import {
  Container,
  HeaderContainer,
  MenuContainer,
  TableContainer,
  TableMenuContainer,
} from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const [programs, setPrograms] = useState([] as Program[]);
  const [selectedProgramId, setSelectedProgramId] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  // TODO: Remove
  useEffect(() => {
    const loadPrograms = async () => {
      setPrograms(await EPGParser.parseFile(new File([], 'test 123.xml')));
    };
    loadPrograms();
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Header
          programs={programs}
          setPrograms={setPrograms}
          setSelectedProgramId={setSelectedProgramId}
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
            onSaveProgram={newprogram => {
              console.log(newprogram);
            }}
          />
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
