import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  max-width: var(--maxWidth);
  gap: 50px;
`;

export const Links = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 50px;

  a {
    white-space: nowrap;
    text-decoration: none;
    color: var(--white);
    font-size: var(--fontMed);
  }
`;

export const Login = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  h1 {
    display: flex;
    align-items: center;
    color: var(--white);
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 40px;
    border-radius: 8px;
    margin: 10px;
    cursor: pointer;
    font-size: var(--fontSmall);
    background-color: var(--white);
    color: var(--darkText);
  }
`;
