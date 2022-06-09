import styled from 'styled-components';

export interface MenuStyleProps {
  minWidth?: string;
  overflowStatus?: string;
}

export const MenuContainer = styled.div<MenuStyleProps>`
  height: 100%;
  width: 100%;
  min-width: ${({ minWidth }) => minWidth || '0px'};
  min-height: 300px;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
  overflow: ${({ overflowStatus }) => overflowStatus || 'auto'};
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

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: calc(100% - 42px);

  padding-left: 29px;
  padding-right: 29px;
`;

export const BottomContainer = styled.div`
  /* border: 1px solid blue; */
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
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
