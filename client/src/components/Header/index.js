import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { Wrapper, Content, Links, Login } from "./Header.styles";

import { AuthContext } from "../../helpers/AuthContext";

function Header() {
  const { authState, setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      username: "",
      managerUsername: "",
      isManager: false,
      status: false,
    });
    history.push("/");
  };

  return (
    <Wrapper>
      <Content>
        <Links>
          <Link to="/">Welcome</Link>
          {!authState.status ? (
            <>
              <Link to="/register">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/tasks">To Do List</Link>
            </>
          )}
        </Links>
        {authState.status && (
          <Login>
            <h1>
              <AccountCircleIcon fontSize="inherit" />
              {authState.username}
            </h1>
            <button onClick={logout}>
              Logout
              <ExitToAppIcon fontSize="inherit" />
            </button>
          </Login>
        )}
      </Content>
    </Wrapper>
  );
}

export default Header;
