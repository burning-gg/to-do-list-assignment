import {
  FETCH_TASKS,
  CREATE_TASK,
  EDIT_STATUS,
  EDIT_TASK,
  DELETE_TASK,
  FILTER_TASKS,
  COPY_TASKS,
} from "./types";

const TasksReducer = (state, action) => {
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
        tasksList: [action.payload, ...state.tasksList],
        cachedTasksList: [action.payload, ...state.cachedTasksList],
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
                endsAt: action.payload.endsAt,
                priority: action.payload.priority,
                status: action.payload.status,
                resUsername: action.payload.resUsername,
              }
            : task
        ),
        cachedTasksList: state.cachedTasksList.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                endsAt: action.payload.endsAt,
                priority: action.payload.priority,
                status: action.payload.status,
                resUsername: action.payload.resUsername,
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
          a.updatedAt > b.updatedAt ? -1 : b.updatedAt > a.updatedAt ? 1 : 0
        ),
        cachedTasksList: action.payload.sort((a, b) =>
          a.updatedAt > b.updatedAt ? -1 : b.updatedAt > a.updatedAt ? 1 : 0
        ),
      };
    default:
      return state;
  }
};

export default TasksReducer;
