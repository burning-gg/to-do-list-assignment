import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 80vh;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: var(--maxWidth);
  border: 4px var(--primary) solid;
  background-color: var(--lightGrey);
  border-radius: 8px;
  padding: 50px;

  form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }

  button {
    background-color: var(--primary);
    color: var(--white);

    &:hover {
      background-color: var(--primary);
    }
  }

  .error {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--danger);
    font-size: var(--fontSmall);
    color: var(--white);
    width: 280px;
    padding: 10px;
    border-radius: 5px;
  }
`;

export const StyledTextField = styled(TextField)`
  width: 280px;
`;
