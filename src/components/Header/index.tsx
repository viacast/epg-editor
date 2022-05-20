import BaseButton from 'components/Button';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MainInput from 'components/Input';
import { FormField } from 'components/Button/styles';
import { Container, Form, Select, Text } from './styles';

const Header: React.FC = ({ ...otherProps }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(0);

  const handleChange = evt => {
    const opt = evt.target.value;
    setCurrentLanguage(opt);
    i18n.changeLanguage(opt);
  };

  // ################################################## //

  const fileInputField = useRef(null);
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
        localStorage.setItem('fileName', file.name);
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

  // ################################################## //

  return (
    <Container>
      <Form>
        <MainInput
          value={
            localStorage.getItem('fileName') !== null
              ? localStorage.getItem('fileName')!
              : 'EPG.CSV'
          }
        />
        <div
          style={{ width: 'auto', height: 'auto', paddingRight: '1.672241%' }}
        >
          <BaseButton
            text={`${t('header:buttonImportProgram')}`}
            icon={<FileDownloadIcon />}
          />
          <FormField
            type="file"
            ref={fileInputField}
            onChange={handleNewFileUpload}
            title=""
            value=""
          />
        </div>
        <BaseButton
          text={`${t('header:buttonExportProgram')}`}
          icon={<UploadFileIcon />}
        />
        <Text>
          {t('header:labelProgram', {
            count: programCount,
          })}
        </Text>
        <BaseButton
          text={`${t('header:buttonAddProgram')}`}
          icon={<AddIcon />}
          onClick={() => setProgramCount(c => c + 1)}
        />
        <Select onChange={handleChange} value={currentLanguage}>
          <option value="pt">Portugues</option>
          <option value="en">English</option>
        </Select>
      </Form>
    </Container>
  );
};

export default Header;
