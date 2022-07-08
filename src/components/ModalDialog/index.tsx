import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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
      <Dialog
        open={modalState}
        onClose={() => setModalState(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalState(false);
              cancel();
            }}
          >
            {t('modal:cancel')}
          </Button>
          <Button
            onClick={() => {
              setModalState(false);
              confirm();
            }}
          >
            {t('modal:confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDialog;
