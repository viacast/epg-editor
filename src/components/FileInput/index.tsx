import React, { useRef } from 'react';

import { Input, InputProps } from 'components';

export interface FileInputRefProps {
  click?: () => void;
  clearFiles?: () => void;
}

export interface FileInputProps {
  forwardRef?: React.MutableRefObject<FileInputRefProps>;
  onFileUpload?: (files: FileList) => void;
}

const FileInput: React.FC<InputProps & FileInputProps> = ({
  forwardRef,
  onFileUpload,
  ...rest
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (forwardRef?.current) {
    // eslint-disable-next-line no-param-reassign
    forwardRef.current.click = () => fileInputRef.current?.click();
    // eslint-disable-next-line no-param-reassign
    forwardRef.current.clearFiles = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Input {...rest} />
      <input
        style={{ display: 'none' }}
        type="file"
        ref={fileInputRef}
        onChange={e => {
          const { files } = e.target;
          onFileUpload?.(files ?? new FileList());
        }}
      />
    </>
  );
};

FileInput.defaultProps = {
  forwardRef: undefined,
  onFileUpload: undefined,
};

export default FileInput;
