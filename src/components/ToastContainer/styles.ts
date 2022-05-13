import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line import/prefer-default-export
export const StyledContainer = styled(ToastContainer)`
  .Toastify__toast-container {
  }

  .Toastify__toast {
    background-color: var(--color-neutral-6);
  }

  .Toastify__toast-body {
    white-space: pre-line;
  }

  .Toastify__progress-bar {
    background-color: var(--color-primary-3);
  }
`;
