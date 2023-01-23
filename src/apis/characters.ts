import axios from "axios";
import {
  characterDetail,
  characterSearch,
  characterShow,
  topic,
} from "../config/urls";
import character from "../redux/reducers/character";
import { Character } from "../utils/type";

export const fetchCharacterSearch = async (
  tgtWord: string,
  appointId: string
) => {
  return await axios
    .get(characterSearch, {
      params: { characters: { tgtWord, appoint_id: appointId } },
    })
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

export const fetchCharacterTopics = async (characterId: string) => {
  return await axios
    .get(topic, { params: { character_id: characterId } })
    .then((res) => res);
};

export const fetchUpdateCharacter = async (character: Character) => {
  return await axios.put(characterShow(character.id), { character });
};

export const fetchDeleteCharacter = async (characterId: string) => {
  return await axios.delete(characterShow(characterId));
};
