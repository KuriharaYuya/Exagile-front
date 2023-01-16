import { GetServerSideProps } from "next";
import Router from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  requestCharacterDetail,
  requestShowCharacter,
} from "../../redux/actions/character/character";
import store, { RootState } from "../../redux/store";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const characterId: string = context.params!.id as string;

  return {
    props: {
      characterId,
    },
  };
};

const CharacterDetail = ({ characterId }: { characterId: string }) => {
  const character = useSelector(
    (state: RootState) => state.characterReducer.character
  );
  useEffect(() => {
    requestShowCharacter(characterId);
  }, []);
  return (
    <>
      <div>{character.name}</div>
      <button onClick={() => Router.push("/")}>ホームに戻る</button>
    </>
  );
};

export default CharacterDetail;
