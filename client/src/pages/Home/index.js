import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Task from "../../components/Task";
import Panel from "../../components/Panel";

import Pagination from "@material-ui/lab/Pagination";

import { Wrapper, Content } from "./Home.styles";

import { TasksContext } from "../../helpers/TasksContext";

function Home() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [total, setTotal] = useState(1);

  const { tasksList, fetchTasks } = useContext(TasksContext);

  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get(`http://localhost:3001/tasks?page=${page}&size=${size}`, {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        })
        .then((response) => {
          setTotal(Math.ceil(response.data.tasksCount / size));
          fetchTasks(response.data.tasksList);
        })
        .catch((err) => console.error(err));
    }
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

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
          <Pagination
            count={total}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </Content>
      </Wrapper>
    </>
  );
}

export default Home;
