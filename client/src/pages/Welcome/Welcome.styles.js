import styled from "styled-components";
import { Link } from "react-router-dom";

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

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
`;

export const StyledLink = styled(Link)`
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;
  border: 4px var(--primary) solid;
  background-color: var(--lightGrey);
  color: var(--dark);
`;
