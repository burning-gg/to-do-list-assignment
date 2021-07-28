import React, { createContext, useReducer } from "react";
import TasksReducer from "./TasksReducer";
import {
  FETCH_TASKS,
  CREATE_TASK,
  EDIT_STATUS,
  EDIT_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  COPY_TASKS,
} from "./types";

const initialState = {
  tasksList: [],
  cachedTasksList: [],
};

export const TasksContext = createContext(initialState);

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState);

  function fetchTasks(tasks) {
    dispatch({
      type: FETCH_TASKS,
      payload: tasks,
    });
  }

  function createTask(task) {
    dispatch({
      type: CREATE_TASK,
      payload: task,
    });
  }

  function editStatus(id, status) {
    dispatch({
      type: EDIT_STATUS,
      payload: { id, status },
    });
  }

  function editTask(task) {
    dispatch({
      type: EDIT_TASK,
      payload: task,
    });
  }

  function deleteTask(id) {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  }

  function filterTasks(tasks) {
    dispatch({
      type: FILTER_TASKS,
      payload: tasks,
    });
  }

  function copyTasks(tasks) {
    dispatch({
      type: COPY_TASKS,
      payload: tasks,
    });
  }

  return (
    <TasksContext.Provider
      value={{
        tasksList: state.tasksList,
        cachedTasksList: state.cachedTasksList,
        fetchTasks,
        createTask,
        editStatus,
        editTask,
        deleteTask,
        filterTasks,
        copyTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
