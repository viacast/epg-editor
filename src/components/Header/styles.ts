import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: fit-content;
  padding-top: 40px;
  padding-left: 25px;
  color: var(--color-neutral-3);
`;

export const Text = styled.div`
  text-align: center;
  white-space: nowrap;
  font-size: 20px;
  margin-left: 34px;
  margin-right: 34px;
  position: relative;
  padding: 10px 0;
`;

export const Select = styled.select`
  padding: 5px 5px 5px 5px;
  margin-left: 15px;
  border-radius: 2px;
  height: 100%;
  border: none;
  font-size: 20px;
  cursor: pointer;
  background: var(--color-neutral-6);
  color: var(--color-neutral-3);
`;
