import React, { useEffect, useState } from "react";
import { fetchIndexCharacterCommunities } from "../../../apis/characters";
import { CharacterDataset } from "../../../utils/type";
import CharactersTable from "./charactersTable";

const Characters = () => {
  const [characterDataSet, setCharacterDataSet] = useState<
    CharacterDataset | undefined
  >(undefined);
  const [dataLength, setDataLength] = useState(0);
  useEffect(() => {
    (async () => {
      const { data } = await fetchIndexCharacterCommunities(0).then(
        (res) => res
      );
      const { characters } = data;
      setDataLength(characters.length);
      setCharacterDataSet(characters);
    })();
  }, []);

  return (
    <>
      <div>
        <CharactersTable dataset={characterDataSet} dataLength={dataLength!} />
      </div>
    </>
  );
};

export default Characters;
