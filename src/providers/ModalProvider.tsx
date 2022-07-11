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
  modalIsOpen: boolean;
  modalTitle: string;
  modalContent: string;
  modalConfirm: () => void;
}

const ModalProviderContext = createContext<ModalProviderContextData>({
  openModal: NOOP,
  closeModal: NOOP,
  modalIsOpen: false,
  modalTitle: '',
  modalContent: '',
  modalConfirm: NOOP,
} as ModalProviderContextData);

const ModalProvider: React.FC<WithChildren> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalConfirm, setModalConfirm] = useState<() => void>(NOOP);

  const openModal = useCallback(
    ({ title, content, confirm }: OpenModalArgs) => {
      setModalIsOpen(true);
      setModalTitle(title);
      setModalContent(content);
      setModalConfirm(() => () => {
        confirm();
        setModalIsOpen(false);
      });
    },
    [],
  );

  const closeModal = useCallback(() => setModalIsOpen(false), []);

  const providerValue = useMemo(
    () => ({
      openModal,
      closeModal,
      modalIsOpen,
      modalTitle,
      modalContent,
      modalConfirm,
    }),
    [
      closeModal,
      modalConfirm,
      modalContent,
      modalIsOpen,
      modalTitle,
      openModal,
    ],
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
