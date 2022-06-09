import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiMenuAddFill } from 'react-icons/ri';
import { FaDownload, FaFileExport } from 'react-icons/fa';

import { EPGParser, Program } from 'services/epg';
import { Button, FileInput, FileInputRefProps } from 'components';
import { HeaderContainer, Select, Text } from './styles';

export interface HeaderProps {
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  setSelectedProgramId: (programId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  programs,
  setPrograms,
  setSelectedProgramId,
}) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(0);
  const [epgFilename, setEpgFilename] = useState('');

  const fileInputRef = useRef<FileInputRefProps>({});

  useEffect(() => {
    setProgramCount(programs.length);
  }, [programs.length]);

  const handleChange = useCallback(
    evt => {
      const { value } = evt.target;
      setCurrentLanguage(value);
      i18n.changeLanguage(value);
    },
    [i18n],
  );

  const handleFileUpload = useCallback(
    async files => {
      if (!files.length) {
        return;
      }
      setEpgFilename(files[0].name);
      const newPrograms = await EPGParser.parseFile(files[0]);
      setPrograms(newPrograms);
    },
    [setPrograms],
  );

  return (
    <HeaderContainer className="no-user-select">
      <FileInput
        forwardRef={fileInputRef}
        disabled
        placeholder={
          epgFilename !== '' ? epgFilename : t('header:placeholderInput')
        }
        onFileUpload={handleFileUpload}
        width="270px"
        height="44px"
      />
      <Button
        text={t('header:buttonImportProgram')}
        icon={<FaDownload />}
        onClick={() => fileInputRef?.current.click?.()}
      />
      <Button text={t('header:buttonExportProgram')} icon={<FaFileExport />} />
      <Button
        text={t('header:buttonAddProgram')}
        icon={<RiMenuAddFill />}
        onClick={() => {
          setProgramCount(programCount + 1);
          setSelectedProgramId(programs[programCount].id);
        }}
      />
      <Text>
        {t('header:labelProgram', {
          count: programCount,
        })}
      </Text>
      <Select onChange={handleChange} value={currentLanguage}>
        <option value="pt">Portugues</option>
        <option value="en">English</option>
      </Select>
    </HeaderContainer>
  );
};

export default Header;
