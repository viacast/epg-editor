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
    min-width: 235px;
    max-width: 270px;
    height: 44px;
  }
`;

export const MenuOptions = styled.div``;

export const HiddenOptionsMenu = styled.div`
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

export const Configurations = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
`;

export const ContainerSettings = styled.div<{
  animation: 'none' | 'rotate' | 'backRotate';
}>`
  .epg-settings-gear {
    animation: ${({ animation }) => animation} 0.325s;
    svg {
      :hover {
        color: var(--color-neutral-2) !important;
      }
    }
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

export const Settings = styled.div`
  background-color: var(--color-neutral-1);
  border: 2px solid var(--color-neutral-3);
  border-radius: 4px;
  position: absolute;
  left: -135px;
  top: 50px;
  z-index: 3;
  padding-inline: 10px;
  padding-top: 4px;
  width: 174px;
  height: 48px;
  vertical-align: middle;
  div {
    text-align: right;
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
    float: left;
    margin-block: 2px;
  }
`;

export const Translation = styled.div`
  position: absolute;
  top: 50px;
  left: -320px;
  z-index: 3;
  min-width: 174px;
  background-color: var(--color-neutral-1);
  border: 2px solid var(--color-neutral-3);
  border-radius: 4px;
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

export const MessagesContainer = styled.div`
  display: flex;
  position: relative;
  margin: 8px 6px 4px 14px;
  svg {
    :hover {
      color: var(--color-neutral-2) !important;
    }
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-neutral-2);
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

export const MessageBadgeContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;

  span:not(:last-child) {
    margin-right: 2px;
  }
`;

export const Popover = styled.div<{
  display: string;
  top: string;
  left: string;
}>`
  position: absolute;
  display: ${({ display }) => display || 'none'};
  z-index: 2;
  top: ${({ top }) => top || '105px'};
  left: ${({ left }) => left || '750px'};
  width: 140px;
  height: 65px;
  padding: 5px;
  border-radius: 4px;
  color: var(--color-neutral-2);
  background-color: var(--color-neutral-3);
  text-align: center;
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
