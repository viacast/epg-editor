import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  width: fit-content;
  color: var(--color-neutral-3);

  .epg-button {
    margin-left: 15px;
  }
`;

export const Text = styled.div`
  position: relative;
  width: 188px;
  padding: 10px 0;
  font-size: 20px;
  text-align: center;
`;

export const Select = styled.select`
  padding: 5px 5px 5px 5px;
  border-radius: 2px;
  height: 100%;
  border: none;
  font-size: 20px;
  cursor: pointer;
  background: var(--color-neutral-6);
  color: var(--color-neutral-3);
`;
