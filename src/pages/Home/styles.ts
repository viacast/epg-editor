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
  padding-left: 30px;
`;

export const TableMenuContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  min-width: 1112px;
  height: 87.1vh;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const TableContainer = styled.div`
  white-space: nowrap;
  min-height: 450px;
  transition: width 0.15s ease-in-out;
  padding-bottom: 50px;
`;

export const MenuContainer = styled.div`
  min-height: 450px;
  padding-bottom: 50px;
  transition: width 0.15s ease-in-out;
`;
