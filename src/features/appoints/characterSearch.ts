import { fetchCharacterSearch } from "../../apis/characters";
import { updateCharacters } from "../../redux/reducers/appoints";
import store from "../../redux/store";

export const requestCharacterSearch = async (
  tgtWord: string,
  appointId: string
) => {
  const characters = await fetchCharacterSearch(tgtWord, appointId).then(
    (res) => res.data
  );
  return store.dispatch(updateCharacters(characters));
};
