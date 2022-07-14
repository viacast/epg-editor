import React from 'react';
import { useTranslation } from 'react-i18next';

import { useModalProvider } from 'providers/ModalProvider';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogTitle,
  StyledButton,
} from './styles';

const ModalDialog: React.FC = () => {
  const { t } = useTranslation();
  const { modalIsOpen, modalTitle, modalContent, modalConfirm, closeModal } =
    useModalProvider();

  return (
    <div>
      <StyledDialog
        open={modalIsOpen}
        onClose={() => closeModal()}
        aria-describedby="alert-dialog-slide-description"
      >
        <StyledDialogTitle>{modalTitle}</StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContentText id="alert-dialog-slide-description">
            {modalContent}
          </StyledDialogContentText>
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton
            onClick={() => {
              closeModal();
            }}
          >
            {t('modal:cancel')}
          </StyledButton>
          <StyledButton
            onClick={() => {
              modalConfirm();
            }}
          >
            {t('modal:confirm')}
          </StyledButton>
        </StyledDialogActions>
      </StyledDialog>
    </div>
  );
};

export default ModalDialog;
