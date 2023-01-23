import {
  fetchAppointCharacters,
  fetchCharactersBoundWithAppoint,
  fetchDeleteRelation,
} from "../../apis/appointCharacters";
import { updateCharacterTags } from "../../redux/reducers/appoints";
import store from "../../redux/store";

export const requestCharacterTags = async (appointId: string) => {
  const { characters } = await fetchCharactersBoundWithAppoint(appointId).then(
    (res) => res.data
  );
  store.dispatch(updateCharacterTags(characters));
};

export const requestAddTag = async (characterId: string, appointId: string) => {
  await fetchAppointCharacters(characterId, appointId).then((res) => res.data);
  await requestCharacterTags(appointId);
  return;
};

export const deleteCharacterRelation = async (
  appointId: string,
  characterId: string
) => {
  return fetchDeleteRelation(appointId, characterId);
};
