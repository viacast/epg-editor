import { FaDownload } from 'react-icons/fa';
import Input from 'components/Input';
import BaseButton from 'components/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, FormField, ButtonContainer } from './styles';

const InputButton: React.FC = () => {
  const { t } = useTranslation();
  const [filename, setFilename] = useState('');

  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState({});

  const maxFileSizeInBytes = 500000;

  const addNewFiles = newFiles => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
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
    <Container>
      <Input
        disabled
        placeholder={`${t('header:placeholderInput')}`}
        value={filename}
        setValue={setFilename}
      />
      <ButtonContainer>
        <BaseButton
          text={`${t('header:buttonImportProgram')}`}
          icon={<FaDownload />}
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
      </ButtonContainer>
    </Container>
  );
};

export default InputButton;
