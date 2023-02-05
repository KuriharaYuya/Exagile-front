import { Button, Modal } from "@mui/material";
import Router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestLogout } from "../../features/auth/logout";
import { homePath } from "../../utils/routes";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    // dispatch(requestLogout());
  };
  return (
    <>
      <button onClick={handleOpen}>ログアウト</button>
    </>
  );
};

export default LogoutButton;
