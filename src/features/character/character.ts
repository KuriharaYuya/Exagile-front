import {
  fetchCharacterDetails,
  fetchCharacterTopics,
  fetchCreateCharacter,
  fetchShowCharacter,
} from "../../apis/characters";
import {
  updateModalCharacter,
  updateCharacterTags,
} from "../../redux/reducers/appoints";
import {
  updateCharacterDetails,
  updateTopics,
} from "../../redux/reducers/character";
import store from "../../redux/store";

export const requestCharacterDetail = async (
  appointId: string,
  characterId: string
) => {
  const { character } = await fetchCharacterDetails(
    appointId,
    characterId
  ).then((res) => res.data);
  store.dispatch(updateCharacterDetails(character));
};

export const requestModalCharacter = async (
  appointId: string,
  characterId: string
) => {
  const { data } = await fetchCharacterDetails(appointId, characterId).then(
    (res) => res
  );
  store.dispatch(updateModalCharacter(data));
};

export const requestShowCharacter = async (characterId: string) => {
  const { character } = (await fetchShowCharacter(characterId)).data;
  store.dispatch(updateCharacterDetails(character));
};
export const requestCreateCharacter = async (
  keyword: string,
  appointId: string
) => {
  const { character } = await fetchCreateCharacter(keyword, appointId).then(
    (res) => res.data
  );
  const characterTags = store.getState().appointReducer.characterTags;
  const updatedCharacters = [...characterTags, character];
  store.dispatch(updateCharacterTags(updatedCharacters));
};

export const requestCharacterTopics = async (characterId: string) => {
  const { topics } = await fetchCharacterTopics(characterId).then(
    (res) => res.data
  );
  store.dispatch(updateTopics(topics));
};
