import React from 'react';
import Table from 'components/Table';
import { Container, HeaderContainer, TableContainer } from './styles';
import Header from './Header';

const Home: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <TableContainer>
        <Table />
      </TableContainer>
    </Container>
  );
};

export default Home;
