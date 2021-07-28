import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Wrapper, Content, StyledTextField } from "./Register.styles";

function Register() {
  const [error, setError] = useState("");

  let history = useHistory();

  const initialValues = {
    first_name: "",
    last_name: "",
    middle_name: "",
    username: "",
    password: "",
    manager_username: "",
  };

  const validationSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    middle_name: yup.string().required(),
    username: yup.string().min(3).max(15).required(),
    password: yup.string().min(4).max(20).required(),
    manager_username: yup.string(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
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
      } else history.push("/login");
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
            id="first_name"
            name="first_name"
            label="First name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />

          <StyledTextField
            id="last_name"
            name="last_name"
            label="Last name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />

          <StyledTextField
            id="middle_name"
            name="middle_name"
            label="Middle name"
            value={formik.values.middle_name}
            onChange={formik.handleChange}
            error={
              formik.touched.middle_name && Boolean(formik.errors.middle_name)
            }
            helperText={formik.touched.middle_name && formik.errors.middle_name}
          />

          <StyledTextField
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <StyledTextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <StyledTextField
            id="manager_username"
            name="manager_username"
            label="Your manager username"
            value={formik.values.manager_username}
            onChange={formik.handleChange}
            error={
              formik.touched.manager_username &&
              Boolean(formik.errors.manager_username)
            }
            helperText={
              formik.touched.manager_username && formik.errors.manager_username
            }
          />

          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </Content>
    </Wrapper>
  );
}

export default Register;
