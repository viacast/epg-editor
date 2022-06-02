import styled from 'styled-components';

export const MenuContainer = styled.div`
  margin-left: 35px;
  height: 100%;
  width: 100%;
  min-height: 300px;
  border-radius: 4px;
  background-color: var(--color-neutral-5);
  overflow: scroll;
`;

export const Toolbar = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  height: 42px;
  border-radius: 4px;
  background-color: var(--color-primary-2);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const BottomContainer = styled.div`
  /* border: 1px solid blue; */
  margin-top: 0px;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding-left: 29px;
  padding-right: 29px;
  height: 100%;
`;

export const LoginFormContainer = styled.div<{ isNarrow?: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  width: 100%;
  height: 100%;
  padding-top: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  min-height: 200px;
  margin-left: auto;
  margin-bottom: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  width: 58px;
  height: 58px;
  margin-left: 14px;
  background: var(--color-neutral-6);
  border-radius: 4px;
`;

export const IconViacast = styled.img`
  width: 100%;
  height: 100%;
`;
