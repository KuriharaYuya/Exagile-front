import { Button } from "@mui/material";
import Router from "next/router";
import React from "react";

const SignupButton = () => {
  const jumpSignUpPageHandler = () => {
    Router.push("/signup");
  };
  return (
    <Button variant="contained" color="primary" onClick={jumpSignUpPageHandler}>
      Sign Up
    </Button>
  );
};

export default SignupButton;
