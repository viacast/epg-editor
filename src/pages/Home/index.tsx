import React, { useEffect, useState } from 'react';
import { ProgramTable } from 'components';
import { EPGParser, Program } from 'services/epg';
import { Container, HeaderContainer, TableContainer } from './styles';
import Header from './Header';

const Home: React.FC = () => {
  const [programs, setPrograms] = useState([] as Program[]);

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
      <TableContainer>
        <ProgramTable programs={programs} />
      </TableContainer>
    </Container>
  );
};

export default Home;
