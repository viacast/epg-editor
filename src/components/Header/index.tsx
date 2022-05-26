import BaseButton from 'components/Button';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiMenuAddFill } from 'react-icons/ri';
import { FaFileExport } from 'react-icons/fa';
import InputButton from 'components/InputButton';
import { Container as HeaderContainer, Select, Text } from './styles';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(0);

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
      <InputButton />
      <BaseButton
        text={`${t('header:buttonExportProgram')}`}
        icon={<FaFileExport />}
      />
      <Text>
        {t('header:labelProgram', {
          count: programCount,
        })}
      </Text>
      <BaseButton
        text={`${t('header:buttonAddProgram')}`}
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
