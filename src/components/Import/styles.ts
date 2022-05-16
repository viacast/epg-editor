import styled from 'styled-components';
import 'styles/global';

export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 270px;
  height: 44px;
  border: none;
  text-transform: none;
  position: absolute;
  top: 40px;
  left: 25px;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
`;

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  appearance: none;
  background-color: transparent;
  border: 2px solid var(--color-neutral-3);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  text-align: center;
  font-weight: 700;
  border-radius: 2px;
  color: var(--color-neutral-3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Nunito', sans-serif;
  width: 139px;
  height: 44px;
  display: flex;
  align-items: center;
  padding-right: 0;
  justify-content: center;

  .icon,
  i {
    font-size: 20px;
    padding-right: 13px;
    border-right: 2px solid;
    vertical-align: middle;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    margin-left: 15px;
    margin-right: 45px;
    font-family: Nunito, sans-serif;
    font-style: Regular;
    font-weight: 400;
    font-size: 16px;
  }

  &:hover {
    color: var(--color-neutral-2);
    border: 2px solid var(--color-neutral-2);
    outline: 0;
    background: transparent;
  }
`;

export const FilePreviewContainer = styled.article`
  margin-bottom: 35px;

  span {
    font-size: 14px;
  }
`;

export const PreviewList = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const FileMetaData = styled.div`
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 2px;
  color: white;
  font-weight: bold;
  background-color: rgba(5, 5, 5, 0.55);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`;

export const RemoveFileIcon = styled.i`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
`;

export const PreviewContainer = styled.section`
  padding: 0.25rem;
  width: 20%;
  height: 120px;
  border-radius: 2px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.55;

    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`;

export const ImagePreview = styled.img`
  border-radius: 2px;
  width: 100%;
  height: 100%;
`;
