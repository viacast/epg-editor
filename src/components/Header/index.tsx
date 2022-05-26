import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiMenuAddFill } from 'react-icons/ri';
import { FaDownload, FaFileExport } from 'react-icons/fa';

import Button from 'components/Button';
import FileInput, { FileInputRefProps } from 'components/FileInput';
import { Container as HeaderContainer, Select, Text } from './styles';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(0);
  const [filename, setFilename] = useState('');

  const fileInputRef = useRef<FileInputRefProps>({});

  const handleChange = useCallback(
    evt => {
      const { value } = evt.target;
      setCurrentLanguage(value);
      i18n.changeLanguage(value);
    },
    [i18n],
  );

  return (
    <HeaderContainer className="no-user-select">
      <FileInput
        forwardRef={fileInputRef}
        disabled
        placeholder={t('header:placeholderInput')}
        value={filename}
        setValue={setFilename}
        onFileUpload={files => {
          if (!files.length) {
            return;
          }
          setFilename(files[0].name);
        }}
      />
      <Button
        text={t('header:buttonImportProgram')}
        icon={<FaDownload />}
        onClick={() => fileInputRef?.current.click?.()}
      />
      <Button text={t('header:buttonExportProgram')} icon={<FaFileExport />} />
      <Text>
        {t('header:labelProgram', {
          count: programCount,
        })}
      </Text>
      <Button
        text={t('header:buttonAddProgram')}
        icon={<RiMenuAddFill />}
        onClick={() => setProgramCount(c => c + 1)}
      />
      <Select onChange={handleChange} value={currentLanguage}>
        <option value="pt">Portugues</option>
        <option value="en">English</option>
      </Select>
    </HeaderContainer>
  );
};

export default Header;
