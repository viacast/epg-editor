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
  min-width: 1415px;
  min-height: 500px;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
  .epg-table-menu-content {
    white-space: nowrap;
    min-height: 450px;
    /* transition: width 0.15s ease-in-out; */
  }
`;

export const TableContainer = styled.div<{ width?: string }>`
  background-color: var(--color-neutral-5);
  border-radius: 4px;
  height: 100%;
  width: ${({ width }) => width || '100%'};
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
    /* transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1); */
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
    border-top: 4px solid var(--color-neutral-5);
    text-align: center;
  }
  .ReactVirtualized__Table__row:hover {
    box-shadow: 20px 20px 20px var(--color-primary-2),
      20px 20px 20px var(--color-primary-2),
      inset 20px 20px 20px var(--color-primary-2),
      inset -20px -20px 20px var(--color-primary-2);
    .epg-add-to-list {
      display: block;
    }
  }
  .active {
    box-shadow: 20px 20px 20px var(--color-primary-2),
      20px 20px 20px var(--color-primary-2),
      inset 20px 20px 20px var(--color-primary-2),
      inset -20px -20px 20px var(--color-primary-2);
  }
  .ReactVirtualized__Table__rowColumn {
    border-radius: 4px;
    padding: 6px;
    margin: 0px;
  }
  .ReactVirtualized__Table__rowColumn:first-of-type {
    margin-left: 0px;
  }
  .container {
    /* max-width: 995px !important; */
  }
`;

export const MenuContainer = styled.div<{ width?: string; tp?: string }>`
  width: ${({ width }) => width || '0px'};
  transition-property: ${({ tp }) => tp || 'width'};
  transition-duration: 0s;
  transition-delay: 0.1s;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;
