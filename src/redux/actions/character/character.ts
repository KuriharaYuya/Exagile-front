import { fetchCharacterDetails } from "../../../apis/characters";
import { updateModalCharacter } from "../../reducers/appoints";
import { updateCharacterDetails } from "../../reducers/character";
import store from "../../store";

export const requestCharacterDetail = async (characterId: string) => {
  const { character } = await fetchCharacterDetails(characterId).then(
    (res) => res.data
  );
  store.dispatch(updateCharacterDetails(character));
};

export const requestModalCharacter = async (characterId: string) => {
  const { character } = await fetchCharacterDetails(characterId).then(
    (res) => res.data
  );
  store.dispatch(updateModalCharacter(character));
};
