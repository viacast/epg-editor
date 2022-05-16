import styled from 'styled-components';
import 'styles/global';

// eslint-disable-next-line import/prefer-default-export
export const Form = styled.form`
  margin-bottom: 15px;
  display: flex;
  width: 935px;
  font-family: Nunito, sans-serif;
  color: var(--color-neutral-3);
  font-size: 20px;
  font-style: Regular;
  font-weight: 400;
`;

export const Container = styled.div`
  padding-top: 40px;
  padding-left: 25px;
  width: 935px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  @media screen and (min-width: 940px) {
    overflow: hidden;
  }
`;

export const Text = styled.p`
  user-select: none;
  margin-left: 31px;
  margin-right: 31px;
  position: relative;
  top: 12px;
  bottom: 12px;
`;
