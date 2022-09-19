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
  min-width: fit-content;
  padding-block: 10px;
  font-size: 20px;
  text-align: center;
`;

export const Message = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
  font-size: 12px;
  text-align: center;
  line-height: 2;
  padding-inline: 5px;
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
  padding-left: 25px;
`;

export const Configurations = styled.div`
  width: 100%;
`;

export const ContainerSettings = styled.div<{
  animation: 'none' | 'rotate' | 'backRotate';
}>`
  margin-inline: 25px;
  .epg-settings-gear {
    animation: ${({ animation }) => animation} 0.325s;
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

export const SettingsOption = styled.div`
  .epg-language-arrow {
    vertical-align: middle;
    position: relative;
    float: right;
    margin-block: 2px;
  }
`;

export const Translation = styled.div<{ display: string }>`
  position: absolute;
  z-index: 3;
  min-width: 174px;
  margin-left: 204px;
  background-color: var(--color-neutral-1);
  border: 2px solid var(--color-neutral-3);
  border-radius: 4px;
  display: ${({ display }) => display || 'none'};
  :hover {
    cursor: pointer;
    display: block;
  }
`;

export const LanguageContainer = styled.div`
  width: 174px;
  height: 44px;
  padding: 9.06px;
  border-radius: 2px;
  background-color: var(--color-neutral-1);
  line-height: 1.5;
  text-align: left;
  :hover {
    cursor: pointer;
    color: var(--color-neutral-4);
    background-color: var(--color-neutral-6);
  }
  svg {
    vertical-align: middle;
    margin-block: 2.5px;
    margin-inline: 2.96px;
    float: right;
  }
`;

export const Flag = styled.div`
  position: relative;
  float: left;
  font-size: 16px;
  text-align: left;
  margin-left: 2.96px;
  margin-right: 13px;
`;
