import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  FormField,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
} from './styles';

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = nestedObj =>
  Object.keys(nestedObj).map(key => nestedObj[key]);

const convertBytesToKB = bytes => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Import = ({
  // eslint-disable-next-line react/prop-types
  updateFilesCb,
  // eslint-disable-next-line react/prop-types
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    // fileInputField.current?.click();
  };

  const addNewFiles = newFiles => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = f => {
    const filesAsArray = convertNestedObjectToArray(f);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = e => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      const updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = fileName => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <input
        spellCheck={false}
        defaultValue="EPG.CSV"
        style={{
          float: 'left',
          backgroundColor: '#2A2B31',
          color: '#85858A',
          border: 'none',
          borderRadius: '2px',
          width: '270px',
          height: '44px',
          padding: '15px',
          marginRight: '12px',
        }}
      />
      <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
        <FontAwesomeIcon className="icon" icon={faDownload} />
        <span> Import </span>
      </UploadFileBtn>
      <FormField
        type="file"
        ref={fileInputField}
        onChange={handleNewFileUpload}
        title=""
        value=""
      />
      <FilePreviewContainer>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            const file = files[fileName];
            const isImageFile = file.type.split('/')[0] === 'image';
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData>
                    {' '}
                    isImageFile={isImageFile}
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon onClick={() => removeFile(fileName)}>
                        <FontAwesomeIcon className="icon" icon={faTrashAlt} />
                      </RemoveFileIcon>
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  );
};

export default Import;
