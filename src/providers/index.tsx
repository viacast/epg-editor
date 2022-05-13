import React from 'react';
import { WithChildren } from 'utils';
import { ExampleProvider } from './ExampleProvider';

const AppProvider: React.FC<WithChildren> = ({ children }) => {
  return <ExampleProvider>{children}</ExampleProvider>;
};

export default AppProvider;
