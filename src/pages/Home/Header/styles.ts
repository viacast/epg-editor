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

export const Message = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
  font-size: 12px;
  text-align: center;
  padding-bottom: 5px;
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
  white-space: nowrap;
  width: fit-content;
  vertical-align: middle;
  padding-block: 4px;
  button {
    padding-block: 8px;
    font-size: 16px;
    font-family: Nunito, sans-serif;
    color: var(--color-neutral-3);
  }
`;

export const AlertsGroup = styled.div`
  display: flex;
`;

export const ContainerSettings = styled.div<{ animate: string }>`
  margin-left: 25px;
  .epg-settings-gear {
    animation: ${({ animate }) => animate || 'rotate'} 0.75s;
  }
  @keyframes rotate {
    0% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }
  @keyframes backRotate {
    0% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(-45deg);
    }
  }
`;

export const Settings = styled.div<{ display: string }>`
  background-color: var(--color-neutral-1);
  border: 2px solid var(--color-neutral-3);
  border-radius: 4px;
  display: ${({ display }) => display || 'none'};
  animation: rotateMenu 1s ease-in-out forwards;
  transform-origin: top center;
  @keyframes rotateMenu {
    0% {
      transform: rotateX(-90deg);
    }
    70% {
      transform: rotateX(20deg);
    }
    100% {
      transform: rotateX(0deg);
    }
  }
  position: absolute;
  z-index: 3;
  padding-inline: 10px;
  padding-top: 4px;
  width: 174px;
  height: 48px;
  vertical-align: middle;
  div {
    width: 150px;
    padding-block: 8px;
    color: var(--color-neutral-3);
    font-size: 18px;
    font-family: Nunito, sans-serif;
    svg {
      width: 16px;
    }
  }
  :hover {
    cursor: pointer;
    background-color: var(--color-neutral-6);
    div {
      color: var(--color-neutral-4);
      svg {
        color: var(--color-neutral-4);
      }
    }
  }
`;

export const SettingsOption = styled.div``;

export const ContainerTranslation = styled.div``;

export const Translation = styled.div<{ display: string }>`
  background-color: var(--color-neutral-1);
  border: 2px solid var(--color-neutral-3);
  border-radius: 4px;
  display: ${({ display }) => display || 'none'};
  position: fixed;
  z-index: 3;
  min-width: 174px;
  margin-top: 44px;
  margin-left: 134px;
  :hover {
    cursor: pointer;
    display: block;
  }
`;

export const Languages = styled.div`
  width: 100%;
  height: 44px;
  padding-left: 10px;
  padding-block: 10px;
  border-radius: 2px;
  background-color: var(--color-neutral-1);
  :hover {
    cursor: pointer;
    color: var(--color-neutral-4);
    background-color: var(--color-neutral-6);
  }
`;
