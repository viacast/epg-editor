import Add from 'components/Add';
import Export from 'components/Export';
import Import from 'components/Import';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Form, Text } from './styles';

const Header: React.FC = () => {
  const { t } = useTranslation();

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = f =>
    setNewUserInfo({ ...newUserInfo, profileImages: f });

  return (
    <Container>
      <Form>
        <Import
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        &nbsp;&nbsp;
        <Export />
        <Text>Programs: 19</Text>
        <Add />
      </Form>
    </Container>
  );
};

export default Header;
