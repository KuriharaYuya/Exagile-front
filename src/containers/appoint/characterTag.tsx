import React, { useState } from "react";
import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { requestCharacterSearch } from "../../redux/actions/appoints/characterSearch";
import store from "../../redux/store";
import { Character } from "../../utils/type";
import { useRouter } from "next/router";
import { fetchAppointCharacters } from "../../apis/appointCharacters";
import {
  requestAddTag,
  requestCharacterTags,
} from "../../redux/actions/appointCharacters/appointCharacters";

const ScrollContainer = styled(Box)`
  height: 25px;
  overflow-y: scroll;
`;

const CharacterForm = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [displayCharacters, setDisplayCharacters] = useState<Character[]>([]);
  const [isFirsRender, setIsFirsRender] = useState(true);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const state = store.getState().appointReducer;
  const { characterTags } = state;

  useEffect(() => {
    if (searchKeyword.length >= 1) {
      (async () => {
        await requestCharacterSearch(searchKeyword);
        const characters = store.getState().appointReducer.characters;
        setDisplayCharacters(characters);
      })();
    } else if (searchKeyword.length === 0) {
      // 最初の処理をもう一度呼び出す
      if (!isFirsRender) handleFocus();
    }
  }, [searchKeyword]);

  const [timeId, setTimeId] = useState<number | null>(null);

  useEffect(() => {
    return () => clearTimeout(timeId!);
  }, [timeId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeId) clearTimeout(timeId);
    const newTimeId = setTimeout(() => {
      setSearchKeyword(event.target.value);
    }, 500);
    // idが入っていることは明白だが、文脈上の警告が出るのでanyでキャスト
    setTimeId(newTimeId as any);
  };

  const handleFocus = async () => {
    if (searchKeyword.length > 0) return;
    await requestCharacterSearch(searchKeyword);
    // 完全に処理を待つことができないため、stateの再定義によって実現
    const state = store.getState().appointReducer;
    const { characters } = state;
    setDisplayCharacters(characters.slice());
    setIsFirsRender(false);
  };
  const handleUnFocus = () => {
    if (searchKeyword.length === 0) {
      setTimeout(() => {
        setIsFirsRender(true);
        // TODO もし追加しているなら、trueに変更しない。storeから状態をもらってくる
      }, 500);
    }
  };

  const addTagHandler = async (character: Character) => {
    const appointId = id;
    await requestAddTag(character.id, appointId);
  };

  useEffect(() => {
    requestCharacterTags(id);
  }, []);

  return (
    <div>
      <div>
        <p>追加されたタグ達</p>
        {characterTags.map((tag) => (
          <div key={tag.id}>{tag.name}</div>
        ))}
      </div>
      <TextField
        label="search"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleUnFocus}
      />
      {!isFirsRender && (
        <ScrollContainer>
          {displayCharacters.map((character) => (
            <div key={character.id}>
              {character.name}
              <button onClick={() => addTagHandler(character)}>追加</button>
            </div>
          ))}
        </ScrollContainer>
      )}
    </div>
  );
};

export default CharacterForm;
