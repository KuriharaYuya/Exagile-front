import axios from "axios";
import { appointCharacters, charactersBoundWithAppoint } from "../config/urls";

export const fetchAppointCharacters = async (
  characterId: string,
  appointId: string
) => {
  return await axios
    .post(appointCharacters, {
      character_id: characterId,
      appoint_id: appointId,
    })
    .then((res) => res);
};

export const fetchCharactersBoundWithAppoint = async (appointId: string) => {
  return await axios
    .get(charactersBoundWithAppoint, { params: { appoint_id: appointId } })
    .then((res) => res);
};
