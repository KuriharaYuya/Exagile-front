import { fetchReviewInsights } from "../apis/insights";
import { updateInsights } from "../redux/reducers/insights";
import store from "../redux/store";

export const requestReviewInsights = async () => {
  const { insights } = await fetchReviewInsights().then((res) => res.data);
  store.dispatch(updateInsights(insights));
};
