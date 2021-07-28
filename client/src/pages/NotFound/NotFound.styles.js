import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: var(--maxWidth);
  gap: 80px;

  div {
    font-size: var(--fontSuperBig);
    color: var(--darkText);
  }
`;
