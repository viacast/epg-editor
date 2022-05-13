import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return <Container>{t('general:home')}</Container>;
};

export default Home;
