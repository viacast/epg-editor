import React from 'react';
import { Slide } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { ErrorBoundary, ModalDialog, ToastContainer } from './components';

import AppProvider from './providers';
import AppRoutes from './routes';
import GlobalStyle, { ColorPallete } from './styles/global';

const App: React.FC = () => {
  return (
    <AppProvider>
      <ErrorBoundary>
        <React.Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ColorPallete.NEUTRAL_1,
              }}
            >
              <BeatLoader color={ColorPallete.NEUTRAL_3} />
            </div>
          }
        >
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
        </React.Suspense>
        <GlobalStyle />
      </ErrorBoundary>
    </AppProvider>
  );
};

export default App;
