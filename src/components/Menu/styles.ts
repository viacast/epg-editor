import styled from 'styled-components';
import { FormControl, InputProps, styled as styledmui } from '@mui/material';

export interface MenuStyleProps {
  minWidth?: string;
  overflowStatus?: string;
}

export const FormRow = styled.div`
  display: inline-flex;
  width: 100%;
`;

export const FormColumn = styled.div`
  width: 100%;
  :not(:first-child) {
    margin-left: 30px;
  }
`;

export const SelectRateContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

export const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  float: right;
`;

export const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

export const MenuContainer = styled.div<MenuStyleProps>`
  height: 100%;
  width: 100%;
  min-width: ${({ minWidth }) => minWidth || '0px'};
  min-height: 300px;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
  overflow: ${({ overflowStatus }) => overflowStatus || 'auto'};
  margin-left: 30px;
`;

export const Toolbar = styled.div<{ display: string }>`
  top: 0px;
  width: 100%;
  height: 42px;
  border-radius: 4px;
  background-color: var(--color-primary-2);
  display: inline-flex;
  text-align: left;
  padding-top: 12px;
  padding-left: 10px;
  font-size: 18px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-neutral-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: space-between;
  p {
    font-size: inherit;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 500;
  }
  svg {
    min-width: 20px;
  }
  #discard {
    display: ${({ display }) => display || 'none'};
    color: var(--color-neutral-4);
    margin-left: auto;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }
  #trash {
    color: var(--color-system-1);
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;

export const ToolbarText = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 450px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    max-width: 450px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ContentContainer = styled.div<MenuStyleProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100% - 42px);
  padding-left: 29px;
  padding-right: 29px;
  overflow: ${({ overflowStatus }) => overflowStatus || 'auto'};
`;

export const BottomContainer = styled.div`
  margin-top: 0px;
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`;

export const FormContainer = styled.div<{ isNarrow?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: auto;
  margin-left: auto;

  .epg-button {
    margin-left: 30px;
    margin-bottom: 30px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const StyledInput = styledmui(FormControl)<InputProps>`
  width: 100%;
  height: 44px;
  display: flex;
  text-align: center;
  vertical-align: middle;
  text-transform: none;
  font-size: 20px;
  border-radius: 4px;
  background-color: var(--color-neutral-6);

  .MuiOutlinedInput-root,
  .MuiOutlinedInput-root.Mui-disabled {
    & > input {
      height: 9px;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > fieldset {
      border: none;
    }
  }

  .MuiOutlinedInput-input,
  .MuiOutlinedInput-input.Mui-disabled {
    -webkit-text-fill-color: var(--color-neutral-3);
  }
`;

export const HelpContainer = styled.div`
  .epg-time {
    color: var(--color-neutral-3);
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 18px;
    padding-top: 4px;
  }
  button {
    margin-bottom: 7px;
    margin-right: -4px;
  }
  svg {
    transform: scale(1.5);
    color: var(--color-neutral-5);
  }
  input {
    text-align: center;
  }
`;
