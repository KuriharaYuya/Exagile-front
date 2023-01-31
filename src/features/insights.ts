import {
  fetchArchivedInsights,
  fetchConcernInsights,
  fetchReviewInsights,
} from "../apis/insight";
import {
  updateArchiveInsights,
  updateConcernInsights,
  updateInsights,
  updateLength,
} from "../redux/reducers/insights";
import store from "../redux/store";

export const requestReviewInsights = async (dataQtl: number) => {
  const { insights, length } = await fetchReviewInsights(dataQtl).then(
    (res) => res.data
  );
  store.dispatch(updateInsights(insights));
  store.dispatch(updateLength(length));
};
export const requestConcerns = async () => {
  const { concerns } = await fetchConcernInsights().then((res) => res.data);
  store.dispatch(updateConcernInsights(concerns));
};

export const requestArchivedInsights = async () => {
  const { insights, length } = await fetchArchivedInsights().then(
    (res) => res.data
  );
  store.dispatch(updateArchiveInsights({ insights, length }));
};
