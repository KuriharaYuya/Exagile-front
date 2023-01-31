import axios from "axios";
import { reviews } from "../config/urls";

export const fetchReviewInsights = async () => {
  return await axios.get(reviews);
};
