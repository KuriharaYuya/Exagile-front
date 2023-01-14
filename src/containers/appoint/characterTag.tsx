import React, { useState } from "react";
import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { requestCharacterSearch } from "../../redux/actions/appoints/characterSearch";
import store from "../../redux/store";
import { Character } from "../../utils/type";
import Router, { useRouter } from "next/router";
import {
  deleteCharacterRelation,
  requestAddTag,
  requestCharacterTags,
} from "../../redux/actions/appointCharacters/appointCharacters";
import { Modal } from "@mui/material";
import { requestModalCharacter } from "../../redux/actions/character/character";
import { request } from "https";

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
  const { modalCharacter } = state;
  const [isOpen, setIsOpen] = useState(false);

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
  const handleModalOpen = async (characterTag: Character) => {
    await requestModalCharacter(characterTag.id);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const goCharacterDetail = () => {
    const character = store.getState().appointReducer.modalCharacter;
    Router.push(`/characters/${character.id}`);
  };

  const deleteRelation = async () => {
    const characterId = modalCharacter.id;
    const appointId = id;
    await deleteCharacterRelation(appointId, characterId);
    Router.reload();
  };

  return (
    <div>
      <div>
        <p>追加されたタグ達</p>
        {characterTags?.map((tag) => {
          return (
            <p key={tag.name} onClick={() => handleModalOpen(tag)}>
              {tag.name}
            </p>
          );
        })}
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
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          padding: "45px",
        }}
      >
        <div>
          モーダル
          <button onClick={goCharacterDetail}>
            {modalCharacter.name}個別ページへ
          </button>
          <button onClick={deleteRelation}>紐づきを解消する</button>
        </div>
      </Modal>
    </div>
  );
};

export default CharacterForm;
