import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import { GlobalStyle } from "./GlobalStyle";

import { AuthContext } from "./helpers/AuthContext";
import { TasksProvider } from "./helpers/TasksContext";

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    managerUsername: "",
    isManager: false,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/check", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            middleName: response.data.middleName,
            username: response.data.username,
            managerUsername: response.data.managerUsername,
            isManager: response.data.isManager,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <TasksProvider>
          <Header />
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/tasks" exact component={Home} />
            <Route path="*" exact component={NotFound} />
          </Switch>
          <GlobalStyle />
        </TasksProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
