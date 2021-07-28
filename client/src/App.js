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
    first_name: "",
    last_name: "",
    middle_name: "",
    username: "",
    manager_username: "",
    is_manager: false,
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
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            middle_name: response.data.middle_name,
            username: response.data.username,
            manager_username: response.data.manager_username,
            is_manager: response.data.is_manager,
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
