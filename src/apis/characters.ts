import axios from "axios";
import { characterDetail, characterSearch } from "../config/urls";

export const fetchCharacterSearch = async (tgtWord: string) => {
  return await axios
    .get(characterSearch, { params: { characters: { tgtWord } } })
    .then((res) => res);
};

export const fetchCharacterDetails = async (characterId: string) => {
  return await axios.get(characterDetail(characterId)).then((res) => res);
};
