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
  isOpen: boolean;
  title: string;
  content: string;
  confirm: () => void;
  cancel: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  title,
  content,
  confirm,
  cancel,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <StyledDialog
        open={isOpen}
        onClose={() => cancel()}
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
              cancel();
            }}
          >
            {t('modal:cancel')}
          </StyledButton>
          <StyledButton
            onClick={() => {
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
