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

export const TableMenuContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  min-width: 1102px;
  height: 87.1vh;
  padding-bottom: 50px;
  /* padding-right: 30px; */
  padding-left: 30px;
`;

export const TableContainer = styled.div`
  white-space: nowrap;
  min-width: 1046px;
  min-height: 450px;
  transition: width 0.15s ease-in-out;
`;

export const MenuContainer = styled.div`
  position: relative;
  min-height: 450px;
  margin-left: 30px;
  transition: width 0.15s ease-in-out;
`;
