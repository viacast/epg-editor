import React from 'react';
import { Slide } from 'react-toastify';
import { ModalDialog, ToastContainer } from './components';

import AppProvider from './providers';
import AppRoutes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer
        autoClose={5000}
        transition={Slide}
        newestOnTop
        closeOnClick
        draggable={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="dark"
      />
      <ModalDialog />
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
