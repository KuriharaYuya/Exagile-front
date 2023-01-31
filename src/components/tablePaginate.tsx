import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from "@mui/material";
import React, { ReactNode } from "react";

type Props = {
  count: number;
  rowsPerPage: number;
  pageState: number;
  onPageChange: (event: any, page: number) => void;
  children: ReactNode;
};
const TablePaginate = ({
  count,
  rowsPerPage,
  pageState,
  onPageChange,
  children,
}: Props) => {
  const tablePaginationProps = {
    rowsPerPageOptions: [25],
    count: count || 0,
    rowsPerPage: rowsPerPage,
    page: pageState,
    component: "div",
    onPageChange: onPageChange,
  };
  return (
    <>
      <TablePagination {...tablePaginationProps} />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TablePaginate;
