import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  width: fit-content; //897px; //46.71875%;
  font-family: Nunito, sans-serif;
  color: var(--color-neutral-3);
`;

export const ButtonContainer = styled.div`
  width: auto;
  height: auto;
  padding-right: 15px;
`;

export const FormField = styled.input`
  font-size: 18px;
  display: none;
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
