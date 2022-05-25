import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MainInput from 'components/Input';
import BaseButton from 'components/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, FormField } from './styles';

const InputButton: React.FC = ({ ...otherProps }) => {
  const { t } = useTranslation();
  const [filename, setFilename] = useState('');

  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState({});

  const maxFileSizeInBytes = 500000;

  const addNewFiles = newFiles => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps) {
          return { file };
        }
        files[file.name] = file;
        setFilename(file.name);
      }
    }
    return { ...files };
  };

  const handleNewFileUpload = e => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
    }
  };

  return (
    <Form>
      <MainInput
        disabled
        placeholder={`${t('header:placeholderInput')}`}
        value={filename}
        setValue={setFilename}
      />
      <div style={{ width: 'auto', height: 'auto', paddingRight: '15px' }}>
        <BaseButton
          text={`${t('header:buttonImportProgram')}`}
          icon={<FileDownloadIcon />}
          onClick={() => {
            fileInputField.current?.click();
          }}
        />
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
        />
      </div>
    </Form>
  );
};

export default InputButton;
