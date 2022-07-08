import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogContentText,
  StyledDialogTitle,
  StyledButton,
} from './styles';

export interface ModalDialogProps {
  title: string;
  content: string;
  confirm: () => void;
  cancel: () => void;
  modalState: boolean;
  setModalState: (value: boolean) => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  title,
  content,
  confirm,
  cancel,
  modalState,
  setModalState,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <StyledDialog
        open={modalState}
        onClose={() => setModalState(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <StyledDialogContent>
          <StyledDialogContentText id="alert-dialog-slide-description">
            {content}
          </StyledDialogContentText>
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton
            onClick={() => {
              setModalState(false);
              cancel();
            }}
          >
            {t('modal:cancel')}
          </StyledButton>
          <StyledButton
            onClick={() => {
              setModalState(false);
              confirm();
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
