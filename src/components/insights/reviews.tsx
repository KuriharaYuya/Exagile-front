import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestReviewInsights } from "../../features/insights";
import { RootState } from "../../redux/store";
import { formatRubyDateTimeToJs } from "../../utils/dateTime";
import { Insight } from "../../utils/type";
import TablePaginate from "../tablePaginate";
import { fetchInsightUpdate } from "../../apis/insight";
import { updateInsights } from "../../redux/reducers/insights";
const Reviews = () => {
  const { reviewInsights } = useSelector(
    (state: RootState) => state
  ).insightsReducer;
  const { insights } = reviewInsights;
  const dispatch = useDispatch();
  const rowsPerPage = 25;
  const [pageState, setPageState] = useState(0);
  const handleOnPageChange = async (event: any, newPage: number) => {
    setPageState(newPage);
    await requestReviewInsights(newPage * rowsPerPage);
  };
  const onCompleteReviewing = async (tgtInsight: Insight) => {
    const editedInsight = await fetchInsightUpdate({
      ...tgtInsight,
      archived: true,
    }).then((res) => res.data.insight);
    const updatedInsights = [
      ...insights.filter((insight) => {
        if (insight.id !== editedInsight.id) return insight;
      }),
      editedInsight,
    ];
    dispatch(updateInsights(updatedInsights));
  };
  const onTurnIntoConcerning = async (tgtInsight: Insight) => {
    const editedInsight = await fetchInsightUpdate({
      ...tgtInsight,
      concerning: true,
    }).then((res) => res.data.insight);
    const updatedInsights = insights.filter((insight) => {
      if (insight.id !== editedInsight.id) return insight;
    });
    dispatch(updateInsights(updatedInsights));
  };
  return (
    <>
      <TablePaginate
        count={reviewInsights.length}
        rowsPerPage={rowsPerPage}
        pageState={pageState}
        onPageChange={handleOnPageChange}
        headers={["title", "reviewed_at"]}
      >
        {insights.map((insight) => (
          <TableRow key={insight.id}>
            <TableCell>
              <p>{insight.title}</p>
            </TableCell>
            <TableCell>
              <p>{formatRubyDateTimeToJs(insight.reviewed_at)}</p>
            </TableCell>
            <button onClick={() => onCompleteReviewing(insight)}>
              復習を完了する
            </button>
            <button onClick={() => onTurnIntoConcerning(insight)}>
              意識する
            </button>
          </TableRow>
        ))}
      </TablePaginate>
    </>
  );
};

export default Reviews;
