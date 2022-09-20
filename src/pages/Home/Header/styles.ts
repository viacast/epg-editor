import styled from 'styled-components';
import { styled as muistyled, Badge } from '@mui/material';

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

export const MessageType = styled.div`
  display: flex;

  font-size: 18px;
  text-align: center;
  line-height: 2;
  padding-inline: 5px;
  justify-content: center;
  align-items: center;

  svg {
    margin-left: 7px;
  }
`;

export const MessageText = styled.div`
  display: flex;
  font-size: 12px;
  text-align: center;
  line-height: 2;
  padding-inline: 5px;
  justify-content: center;
  align-items: center;
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

export const Line = styled.div<{ display: string }>`
  display: ${({ display }) => display || 'none'};
  width: 100%;
  height: 1px;
  background-color: var(--color-neutral-2);
`;

export const AlertsGroup = styled.div`
  margin: 8px 6px 4px 14px;
`;

export const Configurations = styled.div`
  width: 100%;
`;

export const ContainerSettings = styled.div<{
  animation: 'none' | 'rotate' | 'backRotate';
}>`
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

export const MessageBadgeContainer = styled.div`
  display: flex;
  position: absolute;

  span:not(:last-child) {
    margin-right: 2px;
  }
`;

interface BadgeProps {
  backgroundColor: string;
  show?: boolean;
}

export const MessageBadge = muistyled(Badge)<BadgeProps>`
  & .MuiBadge-badge {
    background-color: ${({ backgroundColor }) => backgroundColor || 'default'};
    display:'inline-block';
    position: relative;

    top: -2.5px;
    left: -4px;
  }
`;
