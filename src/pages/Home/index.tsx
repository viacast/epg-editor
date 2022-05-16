import Header from 'components/Header';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header />
    </Container>
  );
};

export default Home;
