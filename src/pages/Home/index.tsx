import React from 'react';
import { ProgramTable } from 'components';
import { Container, HeaderContainer, TableContainer } from './styles';
import Header from './Header';

const Home: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <TableContainer>
        <ProgramTable />
      </TableContainer>
    </Container>
  );
};

export default Home;
