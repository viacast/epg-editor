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
        <Header programs={programs} setPrograms={setPrograms} />
      </HeaderContainer>
      <TableMenuContainer>
        <TableContainer
          style={{ width: selectedProgramId === '' ? '100%' : '78.2%' }}
        >
          <ProgramTable
            setSelectedProgramId={setSelectedProgramId}
            programs={programs}
          />
        </TableContainer>
        <MenuContainer
          style={{
            width: selectedProgramId === '' ? '0px' : '500px',
            // display: selectedProgramId === '' ? 'none' : 'block',
          }}
        >
          <Menu
            programs={programs}
            setSelectedProgramId={setSelectedProgramId}
            selectedProgramId={selectedProgramId}
          />
        </MenuContainer>
      </TableMenuContainer>
    </Container>
  );
};

export default Home;
