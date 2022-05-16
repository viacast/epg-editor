import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormField, ExportFileBtn } from './styles';

const Add = ({ ...otherProps }) => {
  const fileInputField = useRef(null);

  return (
    <>
      <ExportFileBtn type="button">
        <FontAwesomeIcon className="icon" icon={faPlus} />
        <span> Add {otherProps.multiple ? 'files' : 'a file'}</span>
      </ExportFileBtn>
      <FormField
        type="file"
        ref={fileInputField}
        title=""
        value=""
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
      />
    </>
  );
};

export default Add;
