import React, { useContext, useState } from "react";
import moment from "moment";

import CreateTask from "../CreateTask";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AddIcon from "@material-ui/icons/Add";

import { Wrapper, Content } from "./Panel.styles";

import { AuthContext } from "../../helpers/AuthContext";
import { TasksContext } from "../../helpers/TasksContext";

function Panel() {
  const { tasksList, cachedTasksList, filterTasks, copyTasks } =
    useContext(TasksContext);
  const { authState } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterByToday = () => {
    const todayFilter = tasksList.filter((task) => {
      let now = new Date().toISOString();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      return (
        moment(task.endsAt).isSameOrAfter(now) &&
        moment(task.endsAt).isSameOrBefore(tomorrow.toISOString())
      );
    });
    filterTasks(todayFilter);
  };

  const filterByWeek = () => {
    const weekFilter = tasksList.filter((task) => {
      let now = new Date().toISOString();
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      return (
        moment(task.endsAt).isSameOrAfter(now) &&
        moment(task.endsAt).isSameOrBefore(nextWeek.toISOString())
      );
    });
    filterTasks(weekFilter);
  };

  const filterByFuture = () => {
    const futureFilter = tasksList.filter((task) => {
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      return moment(task.endsAt).isSameOrAfter(nextWeek);
    });
    filterTasks(futureFilter);
  };

  const filterByResponsibles = () => {
    const responsiblesFilter = tasksList.filter((task) => {
      return authState.id === task.creatorUserId;
    });
    filterTasks(responsiblesFilter);
  };

  const filterReset = () => {
    copyTasks(cachedTasksList);
  };

  return (
    <Wrapper>
      <Content>
        <div className="profile">
          <i>
            <AssignmentIndIcon fontSize="inherit" />
          </i>
          {" " + authState.lastName + " "}
          {authState.firstName + " "}
          {authState.middleName}
          {authState.isManager ? ", manager" : ", user"}
        </div>
        <div className="options">
          <Button
            variant="contained"
            className="danger"
            onClick={filterByToday}
          >
            Today
          </Button>
          <Button
            variant="contained"
            className="warning"
            onClick={filterByWeek}
          >
            Week
          </Button>
          <Button
            variant="contained"
            className="success"
            onClick={filterByFuture}
          >
            Future
          </Button>
          {authState.isManager && (
            <Button
              variant="contained"
              className="info"
              onClick={filterByResponsibles}
            >
              Responsibles
            </Button>
          )}
          <Button variant="contained" className="primary" onClick={filterReset}>
            Reset
          </Button>
          {authState.isManager && (
            <>
              <Button
                variant="contained"
                className="success"
                onClick={handleClickOpen}
              >
                <AddIcon fontSize="inherit" /> New Task
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <CreateTask setOpen={setOpen} />
              </Dialog>
            </>
          )}
        </div>
      </Content>
    </Wrapper>
  );
}

export default Panel;
