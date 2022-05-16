import Add from 'components/Add';
import Export from 'components/Export';
import Import from 'components/Import';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  });

  const updateUploadedFiles = f =>
    setNewUserInfo({ ...newUserInfo, profileImages: f });

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '25px', width: '100%' }}>
      <form style={{ display: 'flex' }}>
        <Import
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        &emsp;
        <Export
          accept=".jpg,.png,.jpeg"
          label="Profile Image(s)"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
        &emsp; &emsp;
        <p
          style={{
            position: 'relative',
            top: '15px',
            verticalAlign: 'middle',
            fontFamily: 'Nunito, sans-serif',
            color: 'var(--color-neutral-3)',
            fontSize: '20px',
            fontStyle: ' ExtraLight 200',
          }}
        >
          Programs: 19
        </p>
        &emsp; &emsp;
        <Add updateFilesCb={undefined} />
      </form>
    </div>
  );
};

export default Header;
