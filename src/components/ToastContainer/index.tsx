import React from 'react';
import { ToastContainerProps } from 'react-toastify';

import { StyledContainer } from './styles';

const ToastContainer: React.FC<ToastContainerProps> = props => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledContainer {...props} />;
};

export default ToastContainer;
