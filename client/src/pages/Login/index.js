import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Wrapper, Content, StyledTextField } from "./Login.styles";

import { AuthContext } from "../../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username, password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setError(response.data.error);

        const timer = setTimeout(() => {
          try {
            setError("");
          } catch (err) {
            console.error(err);
            clearTimeout(timer);
          }
        }, 3000);
      } else {
        sessionStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name,
          username: response.data.username,
          manager_username: response.data.manager_username,
          is_manager: response.data.is_manager,
          status: true,
        });
        history.push("/tasks");
      }
    });
  };

  return (
    <Wrapper>
      <Content>
        {error && (
          <span className="error">
            <ErrorOutlineIcon /> {error}
          </span>
        )}

        <StyledTextField
          id="username"
          name="username"
          label="Username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <StyledTextField
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button variant="contained" onClick={login}>
          Log in
        </Button>
      </Content>
    </Wrapper>
  );
}

export default Login;
