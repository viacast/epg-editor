import styled from 'styled-components';
import 'styles/global';

export const Container = styled.div`
  user-select: none;
  padding-top: 40px;
  padding-left: 25px;
  width: fit-content;
`;

export const Form = styled.form`
  display: flex;
  width: fit-content;
  font-family: Nunito, sans-serif;
  color: var(--color-neutral-3);
`;

export const Text = styled.div`
  width: 132px;
  height: 44px;
  text-align: center;
  white-space: nowrap;
  font-size: 20px;
  user-select: none;
  margin-left: 34px;
  margin-right: 34px;
  position: relative;
  padding: 10px 0;
`;

export const Select = styled.select`
  position: relative;
  top: 0px;
  left: 15px;
  padding: 5px 5px 5px;
  border-radius: 2px;
  outline: 0;
  width: 140px;
  height: 44px;
  transition: border-color 0.2s;
  border: none;
  box-shadow: none;
  font-family: Nunito, sans-serif;
  font-size: 18px;
  cursor: pointer;
  background: var(--color-neutral-6);
  color: var(--color-neutral-3);
`;
