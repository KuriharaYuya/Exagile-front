import { Button, TextField } from "@mui/material";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import SignupButton from "../components/auth/signupButton";
import {
  requestLoginWithEmail,
  requestLoginWithGoogle,
} from "../features/auth/login";
import { calendarPath } from "../utils/routes";
const Login = () => {
  const dispatch = useDispatch();
  const handleLoginWithGoogle = async () => {
    await requestLoginWithGoogle();
  };
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (formData: any) => {
    const { email, password } = formData as { email: string; password: string };
    await requestLoginWithEmail(email, password);
    Router.push(calendarPath);
  };
  return (
    <>
      <button onClick={handleLoginWithGoogle}>Googleでログイン</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          type="email"
          {...register("email", { required: true })}
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <Button variant="contained" color="primary" type="submit">
          Emailでログイン
        </Button>
      </form>
    </>
  );
};

export default Login;
