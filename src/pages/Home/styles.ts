import styled from 'styled-components';

export interface StyleProps {
  width?: string;
  overflow?: string;
}

export const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: ${({ overflow }) => overflow || 'auto'};
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
  min-height: 500px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;

  .epg-table-menu-content {
    white-space: nowrap;
    min-height: 450px;
    transition: width 0.15s ease-in-out;
    padding-bottom: 50px;
  }
`;

export const TableContainer = styled.div<StyleProps>`
  width: ${({ width }) => width || '100%'};
`;

export const MenuContainer = styled.div<StyleProps>`
  width: ${({ width }) => width || '0px'};
`;
