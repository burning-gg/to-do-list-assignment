import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import moment from "moment";

import EditTask from "../EditTask";

import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";

import { Wrapper, Content } from "./Task.styles";

import { AuthContext } from "../../helpers/AuthContext";
import { TasksContext } from "../../helpers/TasksContext";

function Task({ task }) {
  const { editStatus, deleteTask } = useContext(TasksContext);
  const { authState } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const selectMenuItem = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const time = moment(task.endsAt).format("MMMM Do YYYY, h:mm:ss a");

  const handleChangeStatus = (e) => {
    axios
      .put(
        `http://localhost:3001/tasks/${task.id}`,
        { id: task.id, status: e.target.value },
        {
          headers: { accessToken: sessionStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        editStatus(task.id, response.data);
      });
  };

  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:3001/tasks/${task.id}`, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then(() => {
        deleteTask(task.id);
        setOpen(false);
      });
  };

  const theme = {
    main: "var(--primary)",
  };

  if (task.status === "completed") {
    theme.main = "var(--success)";
  } else if (moment(task.endsAt).isBefore(new Date().toISOString())) {
    theme.main = "var(--danger)";
  }

  return (
    <Wrapper theme={theme}>
      <Content theme={theme}>
        <div className="title">{task.title}</div>
        <div className="settings">
          {task.creatorUserId === authState.id && (
            <>
              <Button
                className="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                <SettingsIcon fontSize="inherit" className="icon" />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <EditTask setOpen={setOpen} task={task} />
              </Dialog>
              <Button
                className="danger"
                variant="contained"
                onClick={handleDeleteTask}
              >
                <CloseIcon fontSize="inherit" className="icon" />
              </Button>
            </>
          )}
        </div>
        <TextField
          id="status"
          name="status"
          label="Status"
          className="status"
          select
          value={task.status}
          onChange={handleChangeStatus}
        >
          <MenuItem key={1} value={"to start"} ref={selectMenuItem}>
            to start
          </MenuItem>
          <MenuItem key={2} value={"started"} ref={selectMenuItem}>
            started
          </MenuItem>
          <MenuItem key={3} value={"completed"} ref={selectMenuItem}>
            completed
          </MenuItem>
          <MenuItem key={4} value={"canceled"} ref={selectMenuItem}>
            canceled
          </MenuItem>
        </TextField>
        <div className="priority">Priority: {task.priority}</div>
        <div className="res_user">Responsible: {task.resUsername}</div>
        <div className="endsAt">Ends at: {time}</div>
      </Content>
    </Wrapper>
  );
}

export default Task;
