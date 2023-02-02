import axios from "axios";
import { topicIdea, topicIdeas } from "../config/urls";
import { TopicIdea } from "../utils/type";

export const fetchTopicIdeas = async (characterId: string, dataQty: number) => {
  return await axios.get(topicIdeas, {
    params: { topic_ideas: { character_id: characterId, data_qty: dataQty } },
  });
};

export const fetchAddTopicIdea = async (
  characterId: string,
  topicIdea: TopicIdea
) => {
  return await axios.post(topicIdeas, {
    topic_ideas: { ...topicIdea, character_id: characterId },
  });
};

export const fetchUpdateTopicIdea = async (tgtIdea: TopicIdea) => {
  return axios.put(topicIdea(tgtIdea.id), { topic_ideas: tgtIdea });
};
