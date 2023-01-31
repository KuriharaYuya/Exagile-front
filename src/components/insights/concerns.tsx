import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInsightUpdate } from "../../apis/insight";
import { requestConcerns } from "../../features/insights";
import { updateConcernInsights } from "../../redux/reducers/insights";
import { RootState } from "../../redux/store";
import { Insight } from "../../utils/type";

const Concerns = () => {
  const { insights } = useSelector(
    (state: RootState) => state.insightsReducer.concernInsights
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await requestConcerns();
    })();
  }, []);
  const turnOffConcerningHandler = async (tgtInsight: Insight) => {
    const updatedInsight = { ...tgtInsight, concerning: false };
    await fetchInsightUpdate(updatedInsight);
    const updatedInsights = insights.filter((insight) => {
      if (insight.id !== tgtInsight.id) return insight;
    });
    dispatch(updateConcernInsights(updatedInsights));
  };
  return (
    <div>
      {insights?.map((insight, index) => {
        return (
          <div key={index}>
            <p>{insight.title}</p>
            <button onClick={() => turnOffConcerningHandler(insight)}>
              意識しない
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Concerns;
