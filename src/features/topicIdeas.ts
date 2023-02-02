import { fetchTopicIdeas } from "../apis/topicIdeas";
import { updateTopicIdeas } from "../redux/reducers/character";
import store from "../redux/store";

export const requestTopicIdeas = async (
  characterId: string,
  dataQty: number
) => {
  const { ideas, length } = await fetchTopicIdeas(characterId, dataQty).then(
    (res) => res.data
  );
  store.dispatch(updateTopicIdeas({ ideas, length }));
};
