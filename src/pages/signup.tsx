import { Button, TextField } from "@mui/material";
import Router from "next/router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import LoginButton from "../components/auth/loginButton";
import {
  requestRegisterWithEmail,
  requestRegisterWithGoogle,
} from "../features/auth/signup";
import { signUpWithEmail } from "../utils/firebase/auth";
import { calendarPath } from "../utils/routes";

const Signup = () => {
  const handleRegister = () => {
    // 登録後自動ログインまで実行
    requestRegisterWithGoogle();
    Router.push(calendarPath);
  };
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (formData: any) => {
    await requestRegisterWithEmail(formData);
    Router.push(calendarPath);
  };
  return (
    <>
      <button onClick={handleRegister}>Googleでユーザー登録</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          type="text"
          {...register("username", { required: true })}
        />
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
          Emailでユーザー登録
        </Button>
        <LoginButton />
      </form>
    </>
  );
};

export default Signup;
