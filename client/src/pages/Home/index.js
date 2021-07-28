import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Task from "../../components/Task";
import Panel from "../../components/Panel";

import { Wrapper, Content } from "./Home.styles";

import { TasksContext } from "../../helpers/TasksContext";

function Home() {
  const { tasksList, fetchTasks } = useContext(TasksContext);

  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/tasks", {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        })
        .then((response) => fetchTasks(response.data.tasksList))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Content key={1}>
          <Panel />
        </Content>
        <Content key={2}>
          {tasksList.length === 0
            ? "No Tasks"
            : tasksList.map((task) => {
                return <Task key={task.id} task={task} />;
              })}
        </Content>
      </Wrapper>
    </>
  );
}

export default Home;
