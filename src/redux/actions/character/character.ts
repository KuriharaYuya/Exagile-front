import { fetchCharacterDetails } from "../../../apis/characters";
import { updateModalCharacter } from "../../reducers/appoints";
import { updateCharacterDetails, updateTopics } from "../../reducers/character";
import store from "../../store";

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
