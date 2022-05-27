import React, { useRef } from 'react';

import { Input, InputProps } from 'components';

export interface FileInputRefProps {
  click?: () => void;
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
          onFileUpload?.(e.target.files ?? new FileList());
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
