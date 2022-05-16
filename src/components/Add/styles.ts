import styled from 'styled-components';
import 'styles/global';

// eslint-disable-next-line import/prefer-default-export
export const AddBtn = styled.button`
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
    margin-left: 30px;
    margin-right: 60px;
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

  &:focus {
    outline: 0;
    background: transparent;
  }
`;
