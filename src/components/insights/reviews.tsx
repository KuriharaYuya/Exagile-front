import { TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TablePaginate from "../tablePaginate";

const Reviews = () => {
  const { reviewInsights } = useSelector(
    (state: RootState) => state
  ).insightsReducer;
  const handleOnPageChange = () => {};
  return (
    <>
      <TablePaginate
        count={reviewInsights.length}
        rowsPerPage={25}
        pageState={0}
        onPageChange={handleOnPageChange}
      >
        {reviewInsights.map((insight) => (
          <TableRow key={insight.id}>
            <TableCell>
              <p>{insight.title}</p>
            </TableCell>
          </TableRow>
        ))}
      </TablePaginate>
    </>
  );
};

export default Reviews;
