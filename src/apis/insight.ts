import axios from "axios";
import { insight } from "../config/urls";
import { Insight } from "../utils/type";

export const fetchInsightUpdate = async (tgtInsight: Insight) => {
  return axios.put(insight(tgtInsight.id), { insight: tgtInsight });
};

export const fetchDeleteInsight = async (insightId: string) => {
  return axios.delete(insight(insightId));
};
