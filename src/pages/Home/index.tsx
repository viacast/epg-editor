import Import from 'components/Import';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = f =>
    setNewUserInfo({ ...newUserInfo, profileImages: f });

  return (
    <div>
      <form>
        <Import
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
      </form>
    </div>
  );
};

export default Home;
