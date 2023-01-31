import axios from "axios";
import { archives, concerns, insight, reviews } from "../config/urls";
import { Insight } from "../utils/type";

export const fetchInsightUpdate = async (tgtInsight: Insight) => {
  return axios.put(insight(tgtInsight.id), { insight: tgtInsight });
};

export const fetchDeleteInsight = async (insightId: string) => {
  return axios.delete(insight(insightId));
};

export const fetchReviewInsights = async (dataQty: number) => {
  return await axios.get(reviews, { params: { data_qty: dataQty } });
};

export const fetchConcernInsights = async () => {
  return await axios.get(concerns);
};
export const fetchArchivedInsights = async () => {
  return await axios.get(archives);
};
