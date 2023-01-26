import axios from "axios";
import {
  characterCommunities,
  characterDetail,
  charactersCommunities,
  characterSearch,
  characterShow,
  indexCharacterCommunities,
  topic,
  unregisterCommunity,
} from "../config/urls";
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
export const fetchSearchCommunities = async (characterId: string) => {
  return await axios.get(characterCommunities(characterId)).then((res) => res);
};
export const fetchAddCommunityToCharacter = async (
  communityId: string,
  characterId: string
) => {
  return await axios
    .post(charactersCommunities, {
      character_communities: {
        community_id: communityId,
        character_id: characterId,
      },
    })
    .then((res) => res);
};

export const fetchDeleteCharactersCommunities = async (
  communityId: string,
  characterId: string
) => {
  return await axios
    // TODO キャラクターコントーラーにおいて、communityのunregisterアクションを作成して完了
    .post(unregisterCommunity, {
      character: { community_id: communityId, character_id: characterId },
    })
    .then((res) => res);
};

export const fetchIndexCharacterCommunities = async (startWith: number) => {
  return await axios.get(indexCharacterCommunities).then((res) => res);
};
