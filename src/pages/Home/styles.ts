import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;

  padding-top: 50px;
  padding-right: 30px;
  margin-bottom: 20px;
  padding-left: 30px;
`;

export const TableContainer = styled.div`
  display: flex;
  flex: 1;

  min-width: 1102px;
  min-height: 450px;
  padding-bottom: 50px;
  padding-right: 30px;
  padding-left: 30px;

  font-family: Nunito, sans-serif;
  color: var(--color-neutral-3);
`;
