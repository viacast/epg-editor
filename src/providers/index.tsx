import React from 'react';
import { WithChildren } from 'utils';
import { ModalProvider } from './ModalProvider';

const AppProvider: React.FC<WithChildren> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default AppProvider;
