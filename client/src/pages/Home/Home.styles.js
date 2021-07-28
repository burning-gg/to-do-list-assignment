import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: var(--maxWidth);
  border: 4px var(--primary) solid;
  border-radius: 8px;
  margin-top: 50px;
  padding: 30px;
  background-color: var(--lightGrey);
`;
