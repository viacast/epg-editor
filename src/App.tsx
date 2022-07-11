import { useModalProvider } from 'providers/ModalProvider';
import React from 'react';
import { Slide } from 'react-toastify';
import { ModalDialog, ToastContainer } from './components';

import AppProvider from './providers';
import AppRoutes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => {
  const { modalIsOpen, modalTitle, modalContent, modalConfirm, closeModal } =
    useModalProvider();

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
      <ModalDialog
        isOpen={modalIsOpen}
        title={modalTitle}
        content={modalContent}
        confirm={modalConfirm}
        cancel={closeModal}
      />
      <GlobalStyle />
    </AppProvider>
  );
};

export default App;
