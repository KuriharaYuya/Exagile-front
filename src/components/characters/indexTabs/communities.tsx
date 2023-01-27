import {
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  fetchAddCommunityHandler,
  fetchCommunitiesIndex,
} from "../../../apis/communities";
import { Communities } from "../../../utils/type";

const CommunitiesTab = () => {
  const [open, setOpen] = useState(false);
  const [communities, setCommunities] = useState<Communities | undefined>(
    undefined
  );
  useEffect(() => {
    (async () => {
      const { data } = await fetchCommunitiesIndex();
      setCommunities(data.communities);
    })();
  }, []);
  const onJumpCommunityHandler = (communityId: string) => {
    Router.push(`/communities/${communityId}`);
  };

  const { register, handleSubmit, reset } = useForm();
  const addCommunityHandler = async (value: any) => {
    const { name } = value;
    const { community } = await fetchAddCommunityHandler(name).then(
      (res) => res.data
    );
    setCommunities((prev) => [...prev!, community]);
    handleClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {communities?.map((community, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      key={index}
                      onClick={() => onJumpCommunityHandler(community.id)}
                    >
                      {community.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <button onClick={handleOpen}>add new community</button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          padding: "45px",
        }}
      >
        <form onSubmit={handleSubmit(addCommunityHandler)}>
          <TextField label="Name" {...register("name", { required: true })} />
          <Button type="submit">Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </form>
      </Modal>
    </>
  );
};

export default CommunitiesTab;
