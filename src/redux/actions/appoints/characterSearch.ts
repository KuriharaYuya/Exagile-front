import { fetchCharacterSearch } from "../../../apis/characters";
import { updateCharacters } from "../../reducers/appoints";
import store from "../../store";

export const requestCharacterSearch = async (tgtWord: string) => {
  const characters = await fetchCharacterSearch(tgtWord).then(
    (res) => res.data
  );
  return store.dispatch(updateCharacters(characters));
};
