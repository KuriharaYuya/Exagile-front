import { Button } from "@mui/material";
import Router from "next/router";
import React from "react";
import { loginPath } from "../../utils/routes";

const LoginButton = () => {
  const jumpLoginPageHandler = () => {
    Router.push(loginPath);
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={jumpLoginPageHandler}
      sx={{ mr: 2 }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
