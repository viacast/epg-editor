import BaseButton from 'components/Button';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InputButton from 'components/InputButton';
import { Container, Form, Select, Text } from './styles';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [programCount, setProgramCount] = useState(19);

  const handleChange = evt => {
    const opt = evt.target.value;
    setCurrentLanguage(opt);
    i18n.changeLanguage(opt);
  };

  return (
    <Container>
      <Form>
        <InputButton />
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
