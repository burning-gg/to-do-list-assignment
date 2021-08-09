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
    firstName: "",
    lastName: "",
    middleName: "",
    username: "",
    password: "",
    managerUsername: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    middleName: yup.string().required(),
    username: yup.string().min(3).max(15).required(),
    password: yup.string().min(4).max(20).required(),
    managerUsername: yup.string(),
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
            id="firstName"
            name="firstName"
            label="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={
              formik.touched.firstName && Boolean(formik.errors.firstName)
            }
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <StyledTextField
            id="lastName"
            name="lastName"
            label="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <StyledTextField
            id="middleName"
            name="middleName"
            label="Middle name"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            error={
              formik.touched.middleName && Boolean(formik.errors.middleName)
            }
            helperText={formik.touched.middleName && formik.errors.middleName}
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
            id="managerUsername"
            name="managerUsername"
            label="Your manager username"
            value={formik.values.managerUsername}
            onChange={formik.handleChange}
            error={
              formik.touched.managerUsername &&
              Boolean(formik.errors.managerUsername)
            }
            helperText={
              formik.touched.managerUsername && formik.errors.managerUsername
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
