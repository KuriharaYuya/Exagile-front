import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { title } from "process";
import React, { ReactNode } from "react";

type Props = {
  count: number;
  rowsPerPage: number;
  pageState: number;
  onPageChange: (event: any, page: number) => void;
  children: ReactNode;
  headers: string[] | undefined;
};
const TablePaginate = ({
  count,
  rowsPerPage,
  pageState,
  onPageChange,
  children,
  headers,
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
            {headers && (
              <TableHead>
                <TableRow>
                  {headers.map((title, index) => {
                    return <TableCell key={index}>{title}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
            )}
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TablePaginate;
