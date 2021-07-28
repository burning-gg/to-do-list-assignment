import React, { useContext } from "react";

import { Wrapper, Content, StyledLink } from "./Welcome.styles";

import { AuthContext } from "../../helpers/AuthContext";

function Welcome() {
  const { authState } = useContext(AuthContext);

  return (
    <Wrapper>
      <Content>
        <div>Welcome to our To Do App</div>
        <div>Managers & Employees</div>
        {!authState.status && (
          <div className="links">
            <StyledLink to="/register">Sign Up</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </div>
        )}
      </Content>
    </Wrapper>
  );
}

export default Welcome;
