import styled from 'styled-components';

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

export const Toolbar = styled.div`
  top: 0px;
  width: 100%;
  height: 42px;
  border-radius: 4px;
  background-color: var(--color-primary-2);
  display: inline-flex;
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 18px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  color: var(--color-neutral-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  p {
    font-size: inherit;
    padding-left: 10px;
    font-weight: 500;
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
