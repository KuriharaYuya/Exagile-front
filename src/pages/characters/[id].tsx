import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchDeleteCharacter,
  fetchUpdateCharacter,
} from "../../apis/characters";
import { fetchUpdateTopic } from "../../apis/topic";
import {
  requestCharacterTopics,
  requestShowCharacter,
} from "../../redux/actions/character/character";
import {
  updateCharacterDetails,
  updateTopics,
} from "../../redux/reducers/character";
import store, { RootState } from "../../redux/store";
import { Topic } from "../../utils/type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const characterId: string = context.params!.id as string;

  return {
    props: {
      characterId,
    },
  };
};

const CharacterDetail = ({ characterId }: { characterId: string }) => {
  const { character, topics } = useSelector(
    (state: RootState) => state.characterReducer
  );
  useEffect(() => {
    (async () => {
      await requestShowCharacter(characterId);
      await requestCharacterTopics(characterId);
    })();
  }, []);

  const [characterEditing, setCharacterEditing] = useState("");

  const openInputFiled = (filed: string) => {
    console.log(characterEditing === filed);
    setCharacterEditing(filed);
  };

  const characterOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = characterEditing;
    store.dispatch(
      updateCharacterDetails({ ...character, [field]: e.target.value })
    );
  };

  const onCharacterBlur = async () => {
    // TODO 現在のreduxで管理してるcharacterのstateの情報でAPIを叩く
    await fetchUpdateCharacter(character);
    setCharacterEditing("");
  };
  const deleteHandle = async () => {
    characterId = character.id;
    await fetchDeleteCharacter(characterId);
    Router.back();
  };

  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingTopicFiled, setEditingTopicFiled] = useState("");

  const selectTopicCell = (topic: Topic, filed: string) => {
    setEditingTopic(topic);
    setEditingTopicFiled(filed);
  };

  const topicCellBlur = async () => {
    const tgtTopic: Topic = topics.find(
      (topic) => topic.id === editingTopic?.id
    )!;
    await fetchUpdateTopic(tgtTopic);
    setEditingTopic(null);
    setEditingTopicFiled("");
  };

  const changeTopicField = async (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedTopics = topics.map((topic) => {
      if (topic.id === editingTopic?.id) {
        return { ...topic, [field]: event.target.value };
      } else {
        return topic;
      }
    });
    store.dispatch(updateTopics(updatedTopics));
  };

  return (
    <>
      <div>
        <div onClick={() => openInputFiled("name")}>
          {characterEditing === "name" ? (
            <input
              type="text"
              value={character.name}
              onChange={(e) => characterOnChange(e)}
              onBlur={onCharacterBlur}
            />
          ) : (
            <p>{character.name}</p>
          )}
        </div>
        <div onClick={() => openInputFiled("profile")}>
          {characterEditing === "profile" ? (
            <input
              type="text"
              value={character.profile}
              onChange={(e) => characterOnChange(e)}
              onBlur={onCharacterBlur}
            />
          ) : character.profile ? (
            <p>{character.profile}</p>
          ) : (
            <p>profile</p>
          )}
        </div>
      </div>
      <div>
        <p>topics</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
              <TableCell>content</TableCell>
              <TableCell>アポイント</TableCell>
              <TableCell>更新日時</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topics.map((topic) => (
              <TableRow key={topic.id}>
                <TableCell
                  onClick={() => selectTopicCell(topic, "title")}
                  onBlur={topicCellBlur}
                >
                  {editingTopic?.id == topic.id &&
                  editingTopicFiled == "title" ? (
                    <input
                      type="text"
                      value={topic.title}
                      onChange={(e) => changeTopicField("title", e)}
                    />
                  ) : (
                    topic.title
                  )}
                </TableCell>
                <TableCell
                  onClick={() => selectTopicCell(topic, "content")}
                  onBlur={topicCellBlur}
                >
                  {editingTopic?.id == topic.id &&
                  editingTopicFiled == "content" ? (
                    <input
                      type="text"
                      value={topic.content}
                      onChange={(e) => changeTopicField("content", e)}
                    />
                  ) : (
                    topic.content
                  )}
                </TableCell>
                <TableCell>
                  <span>
                    <Link href={`/appoints/${topic.appointId}`}>
                      {topic.appointTitle}
                    </Link>
                  </span>
                </TableCell>
                <TableCell>{topic.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <button onClick={() => Router.push("/")}>ホームに戻る</button>
      <button onClick={deleteHandle}>delete character</button>
    </>
  );
};

export default CharacterDetail;
