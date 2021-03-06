import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Wrapper, Content, StyledTextField } from "./CreateTask.styles";

import { TasksContext } from "../../helpers/TasksContext";

function CreateTask({ setOpen }) {
  const { createTask } = useContext(TasksContext);

  const [error, setError] = useState("");
  const selectMenuItem = useRef(null);

  let history = useHistory();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const initialValues = {
    title: "",
    description: "",
    endsAt: "",
    priority: "medium",
    status: "to start",
    resUsername: "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    endsAt: yup.date().required(),
    priority: yup.string().required(),
    status: yup.string().required(),
    resUsername: yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/tasks", data, {
        headers: { accessToken: sessionStorage.getItem("accessToken") },
      })
      .then((response) => {
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
          createTask(response.data);
          setOpen(false);
        }
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Wrapper>
      <Content>
        <form onSubmit={formik.handleSubmit}>
          {error && (
            <span className="error">
              <ErrorOutlineIcon /> {error}
            </span>
          )}

          <StyledTextField
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <StyledTextField
            id="description"
            name="description"
            label="Description (multiline)"
            multiline
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <StyledTextField
            id="endsAt"
            name="endsAt"
            label="Ends at"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.endsAt}
            onChange={formik.handleChange}
            error={formik.touched.endsAt && Boolean(formik.errors.endsAt)}
            helperText={formik.touched.endsAt && formik.errors.endsAt}
          />

          <StyledTextField
            id="priority"
            name="priority"
            label="Priority"
            select
            value={formik.values.priority}
            onChange={formik.handleChange}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
            helperText={formik.touched.priority && formik.errors.priority}
          >
            <MenuItem key={1} value={"high"} ref={selectMenuItem}>
              high
            </MenuItem>
            <MenuItem key={2} value={"medium"} ref={selectMenuItem}>
              medium
            </MenuItem>
            <MenuItem key={3} value={"low"} ref={selectMenuItem}>
              low
            </MenuItem>
          </StyledTextField>

          <StyledTextField
            id="status"
            name="status"
            label="Status"
            select
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
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
          </StyledTextField>

          <StyledTextField
            id="resUsername"
            name="resUsername"
            label="Responsible's username"
            value={formik.values.resUsername}
            onChange={formik.handleChange}
            error={
              formik.touched.resUsername && Boolean(formik.errors.resUsername)
            }
            helperText={
              formik.touched.resUsername && formik.errors.resUsername
            }
          />

          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Content>
    </Wrapper>
  );
}

export default CreateTask;
