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
  height: 100%;
  min-width: 1210px;
  min-height: 500px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  .epg-table-menu-content {
    white-space: nowrap;
    min-height: 450px;
  }
`;

export const TableContainer = styled.div<{ width?: string }>`
  overflow-x: auto;
  overflow-y: hidden;
  background-color: var(--color-neutral-5);
  border-radius: 4px;
  height: 100%;
  min-width: 590px;
  width: ${({ width }) => width || '100%'};
  transition: width 0.5s;
  body,
  input,
  button,
  div {
    font-family: Nunito, sans-serif;
    font-size: 16px;
  }
  input[type='checkbox'] {
    position: relative;
    margin-inline: 5px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    color: var(--color-neutral-1);
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    &::before {
      position: absolute;
      content: '';
      display: block;
      top: 3.5px;
      left: 6px;
      width: 4px;
      height: 7px;
      border-style: solid;
      border-color: var(--color-neutral-2);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      color: var(--color-neutral-2);
      border-color: var(--color-neutral-2);
      background: trasparent;
      &::before {
        opacity: 1;
      }
      ~ label::before {
        clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
      }
    }
  }
  .epg-pg {
    display: block;
    max-width: 225.5px;
    min-width: 225.5px;
    margin-left: 25px;
    margin-right: 25px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    div {
      padding-top: 2.5px;
    }
  }
  .ReactVirtualized__Table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: 'Nunito', Nunito, sans-serif;
    table-layout: fixed;
    width: 100%;
    color: var(--color-neutral-2);
    text-align: left;
    border-radius: 4px;
    z-index: 0;
  }
  .ReactVirtualized__Table__headerRow {
    color: var(--color-neutral-2);
    border-bottom: 5px solid var(--color-neutral-1);
    border-radius: 4px;
    background-color: var(--color-neutral-5);
    margin: 0;
    position: sticky;
    top: 0;
    user-select: none;
  }
  .ReactVirtualized__Table__headerColumn {
    text-align: center;
    margin-left: 0px;
  }
  .ReactVirtualized__Table__row {
    max-width: 100%;
    border-inline: 6px solid var(--color-neutral-5);
    border-top: 2px solid var(--color-neutral-5);
    border-bottom: 2px solid var(--color-neutral-5);

    text-align: center;
  }
  .ReactVirtualized__Table__row:hover {
    border: 1px solid var(--color-system-3);
    border-radius: 4px;
    .epg-add-to-list {
      display: block;
    }
  }
  .active {
    box-shadow: inset 50px 50px 50px var(--color-primary-2),
      inset -50px -50px 50px var(--color-primary-2);
  }
  .ReactVirtualized__Table__rowColumn {
    border-radius: 4px;
    padding: 6px;
    margin: 0px;
  }
  .ReactVirtualized__Table__rowColumn:first-of-type {
    margin-left: 0px;
  }
  // Row Content size
  .ReactVirtualized__Table__rowColumn[aria-colindex='1'] {
    text-align: center !important;
    min-width: 50px !important;
    max-width: 50px !important;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis !important;
  }
  .ReactVirtualized__Table__rowColumn[aria-colindex='2'] {
    text-align: center !important;
    min-width: 170px !important;
    max-width: 200px !important;
  }
  .ReactVirtualized__Table__rowColumn[aria-colindex='3'] {
    text-align: center !important;
    min-width: 170px !important;
    max-width: 200px !important;
  }
  .ReactVirtualized__Table__rowColumn[aria-colindex='4'] {
    text-align: center !important;
    min-width: 95px !important;
    max-width: 110px !important;
  }
  .ReactVirtualized__Table__rowColumn[aria-colindex='5'] {
    padding-left: 10px;
    min-width: 150px !important;
    max-width: 300px !important;
  }
  .ReactVirtualized__Table__rowColumn[aria-colindex='7'] {
    min-width: 110px !important;
  }
`;

export const MenuContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => width || '0px'};
  transition: width 0.5s;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
