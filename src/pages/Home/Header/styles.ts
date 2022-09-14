import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  width: fit-content;
  color: var(--color-neutral-3);

  .epg-button {
    margin-left: 15px;
  }

  .epg-input {
    min-width: 270px;
    height: 44px;
  }
`;

export const Text = styled.div`
  min-width: 188px;
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
`;

export const Select = styled.select`
  padding: 5px 5px 5px 5px;
  border-radius: 2px;
  min-width: 122px;
  min-height: 44px;
  max-height: 44px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  background: var(--color-neutral-6);
  color: var(--color-neutral-3);
`;

export const MenuOptions = styled.div``;

export const ExportOptions = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
  position: absolute;
  z-index: 3;
  padding-top: 10px;
  .epg-button {
    background: var(--color-neutral-1);
  }
  .epg-button:first-child {
    margin-bottom: 5px;
  }
`;

export const Alerts = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
`;

export const AlertsGroup = styled.div`
  margin-left: 5px;
  display: flex;
  button {
    font-size: 16px;
    font-family: Nunito, sans-serif;
    color: var(--color-neutral-3);
  }
`;
