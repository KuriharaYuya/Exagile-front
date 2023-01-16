import axios from "axios";
import {
  characterDetail,
  characterSearch,
  characterShow,
  topic,
} from "../config/urls";

export const fetchCharacterSearch = async (tgtWord: string) => {
  return await axios
    .get(characterSearch, { params: { characters: { tgtWord } } })
    .then((res) => res);
};

export const fetchCharacterDetails = async (
  appointId: string,
  characterId: string
) => {
  return await axios
    .get(characterDetail, {
      params: { appoint_id: appointId, character_id: characterId },
    })
    .then((res) => res);
};

export const fetchShowCharacter = async (characterId: string) => {
  return await axios.get(characterShow(characterId)).then((res) => res);
};

export const fetchCreateCharacter = (keyword: string, appointId: string) => {
  return axios.post(characterSearch, {
    character: { appoint_id: appointId, keyword },
  });
};
