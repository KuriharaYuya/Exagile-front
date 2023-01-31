import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { requestArchivedInsights } from "../../features/insights";
import { RootState } from "../../redux/store";
import { formatRubyDateTimeToJs } from "../../utils/dateTime";
import TablePaginate from "../tablePaginate";

const Archives = () => {
  const { insights, length } = useSelector(
    (state: RootState) => state.insightsReducer.archiveInsights
  );
  useEffect(() => {
    (async () => {
      await requestArchivedInsights();
    })();
  }, []);
  const [pageState, setPageState] = useState(0);
  const onPageChange = (event: any, newPage: number) => {
    setPageState(newPage);
  };
  return (
    <TablePaginate
      count={length}
      onPageChange={onPageChange}
      pageState={pageState}
      rowsPerPage={25}
      headers={undefined}
    >
      {insights.map((insight) => (
        <TableRow key={insight.id}>
          <TableCell>
            <p>{insight.title}</p>
          </TableCell>
          <TableCell>
            <p>{formatRubyDateTimeToJs(insight.reviewed_at)}</p>
          </TableCell>
        </TableRow>
      ))}
    </TablePaginate>
  );
};

export default Archives;
