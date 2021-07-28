import styled from "styled-components";

export const Wrapper = styled.div`
  border: 4px var(--primary) solid;
  border-radius: 8px;
`;

export const Content = styled.div`
  padding: 30px;
  width: 800px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  .profile {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: var(--fontBig);

    i {
      font-size: var(--fontSuperBig);
    }
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .danger {
      background-color: var(--danger);
      color: var(--white);
    }

    .warning {
      background-color: var(--warning);
      color: var(--white);
    }

    .success {
      background-color: var(--success);
      color: var(--white);
    }

    .info {
      background-color: var(--info);
      color: var(--white);
    }

    .primary {
      background-color: var(--primary);
      color: var(--white);
    }
  }
`;
