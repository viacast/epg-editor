import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { NOOP, WithChildren } from 'utils';

export interface OpenModalArgs {
  title: string;
  content: string;
  confirm: () => void;
}

interface ModalProviderContextData {
  openModal: (arg: OpenModalArgs) => void;
  closeModal: () => void;
  modalState: boolean;
  modalTitle: string;
  modalContent: string;
  modalConfirm: () => void;
}

const ModalProviderContext = createContext<ModalProviderContextData>(
  {} as ModalProviderContextData,
);

const ModalProvider: React.FC<WithChildren> = ({ children }) => {
  const [modalState, setModalState] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirm, setModalConfirm] = useState<() => void>(NOOP);

  const openModal = useCallback(
    ({ title, content, confirm }: OpenModalArgs) => {
      setModalState(true);
      setModalTitle(title);
      setModalContent(content);
      setModalConfirm(() => {
        confirm();
        setModalState(false);
      });
    },
    [],
  );

  const closeModal = useCallback(() => setModalState(false), []);

  const providerValue = useMemo(
    () => ({
      openModal,
      closeModal,
      modalState,
      modalTitle,
      modalContent,
      modalConfirm,
    }),
    [closeModal, modalConfirm, modalContent, modalState, modalTitle, openModal],
  );

  return (
    <ModalProviderContext.Provider value={providerValue}>
      {children}
    </ModalProviderContext.Provider>
  );
};

const useModalProvider = (): ModalProviderContextData => {
  return useContext(ModalProviderContext);
};

export { ModalProvider, useModalProvider };
