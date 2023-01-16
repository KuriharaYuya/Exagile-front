import axios from "axios";
import { topic, topicDetail } from "../config/urls";
import { Topic } from "../utils/type";

export const fetchUpdateTopic = async (topic: Topic) => {
  return await axios.patch(topicDetail(topic.id), { topics: topic });
};

export const fetchNewTopic = async (characterId: string, appointId: string) => {
  return axios
    .post(topic, {
      topic: { character_id: characterId, appoint_id: appointId },
    })
    .then((res) => res);
};

export const fetchDeleteTopic = async (topicId: string) => {
  return await axios.delete(topicDetail(topicId));
};
