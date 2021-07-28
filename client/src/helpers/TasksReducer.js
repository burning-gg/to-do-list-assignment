import {
  FETCH_TASKS,
  CREATE_TASK,
  EDIT_STATUS,
  EDIT_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  COPY_TASKS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasksList: [...action.payload],
        cachedTasksList: [...action.payload],
      };
    case CREATE_TASK:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload],
        cachedTasksList: [...state.cachedTasksList, action.payload],
      };
    case EDIT_STATUS:
      return {
        ...state,
        tasksList: state.tasksList.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
              }
            : task
        ),
        cachedTasksList: state.cachedTasksList.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
              }
            : task
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasksList: state.tasksList.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                ends_at: action.payload.ends_at,
                priority: action.payload.priority,
                status: action.payload.status,
                res_username: action.payload.res_username,
              }
            : task
        ),
        cachedTasksList: state.cachedTasksList.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                ends_at: action.payload.ends_at,
                priority: action.payload.priority,
                status: action.payload.status,
                res_username: action.payload.res_username,
              }
            : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task.id !== action.payload),
        cachedTasksList: state.cachedTasksList.filter(
          (task) => task.id !== action.payload
        ),
      };
    case FILTER_TASKS:
      return {
        ...state,
        tasksList: [...action.payload],
      };
    case COPY_TASKS:
      return {
        ...state,
        tasksList: action.payload.sort((a, b) =>
          a.updated_at > b.updated_at ? -1 : b.updated_at > a.updated_at ? 1 : 0
        ),
        cachedTasksList: action.payload.sort((a, b) =>
          a.updated_at > b.updated_at ? -1 : b.updated_at > a.updated_at ? 1 : 0
        ),
      };
    default:
      return state;
  }
};
