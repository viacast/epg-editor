import styled from 'styled-components';
import 'styles/global';

// eslint-disable-next-line import/prefer-default-export
export const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 139px;
  height: 44px;
  border: none;
  text-transform: none;
  position: relative;
  top: -44px;
  left: 0px;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  z-index: -1;
`;

export const Form = styled.form`
  display: flex;
  width: fit-content; //897px; //46.71875%;
  font-family: Nunito, sans-serif;
  color: var(--color-neutral-3);
`;
