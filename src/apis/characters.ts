import axios from "axios";
import { characterSearch } from "../config/urls";

export const fetchCharacterSearch = async (tgtWord: string) => {
  return await axios
    .get(characterSearch, { params: { characters: { tgtWord } } })
    .then((res) => res);
};
