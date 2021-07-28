import styled from "styled-components";

export const Wrapper = styled.div`
  border: 4px solid ${(props) => props.theme.main};

  border-radius: 8px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Content = styled.div`
  padding: 30px;
  white-space: nowrap;
  width: 800px;
  display: grid;
  grid-template-areas:
    "title settings"
    "res_username priority"
    "ends_at status";
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  justify-items: start;
  grid-gap: 50px;
  grid-column-gap: 100px;

  color: ${(props) => props.theme.main};

  div {
    font-size: var(--fontMed);
  }

  .title {
    font-size: var(--fontBig);
    grid-area: title;
  }

  .res_username {
    grid-area: res_username;
  }

  .ends_at {
    grid-area: ends_at;
  }

  .priority {
    grid-area: priority;
  }

  .status {
    grid-area: status;
  }

  .settings {
    grid-area: settings;
    justify-self: center;

    button {
      height: 50px;
      width: 50px;
      margin: 15px;
    }

    .primary {
      background-color: var(--primary);
    }

    .danger {
      background-color: var(--danger);
      color: var(--white);
    }

    .icon {
      font-size: var(--fontBig);
    }
  }
`;
