import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/system";
import { requestCharacterSearch } from "../../features/appoints/characterSearch";
import store, { RootState } from "../../redux/store";
import { Character, Topic } from "../../utils/type";
import Router, { useRouter } from "next/router";
import {
  deleteCharacterRelation,
  requestAddTag,
  requestCharacterTags,
} from "../../features/appointCharacters/appointCharacters";
import { updateModalCharacter } from "../../redux/reducers/appoints";
import { useSelector } from "react-redux";
import { initialTopicState } from "../../utils/initialStates";
import {
  fetchDeleteTopic,
  fetchNewTopic,
  fetchUpdateTopic,
} from "../../apis/topic";
import {
  requestCreateCharacter,
  requestModalCharacter,
} from "../../features/character/character";

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
  const state = useSelector((state: RootState) => state.appointReducer);
  const { characterTags } = state;
  const { modalCharacter } = state;
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  useEffect(() => {
    if (searchKeyword.length >= 1) {
      (async () => {
        await requestCharacterSearch(searchKeyword, id);
        const characters = store.getState().appointReducer.characters;
        setDisplayCharacters(characters);
        const isNotTagExist = () => {
          return (
            characterTags.filter((tag) => tag.name === searchKeyword).length > 0
          );
        };
        if (!isNotTagExist()) {
          setSuggestion(searchKeyword);
        } else {
          setSuggestion("");
        }
      })();
    } else if (searchKeyword.length === 0) {
      // 最初の処理をもう一度呼び出す
      setSuggestion("");
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
    await requestCharacterSearch(searchKeyword, id);
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
    const appointId = id;
    await requestModalCharacter(appointId, characterTag.id);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const goCharacterDetail = () => {
    const { character } = store.getState().appointReducer.modalCharacter;
    Router.push(`/characters/${character.id}`);
  };

  const deleteRelation = async () => {
    const characterId = modalCharacter.character.id;
    const appointId = id;
    await deleteCharacterRelation(appointId, characterId);
    Router.reload();
  };
  const addTopicHandler = async () => {
    const characterId = modalCharacter.character.id;
    const appointId = id;
    const newTopic = await fetchNewTopic(characterId, appointId).then(
      (res) => res.data
    );
    store.dispatch(
      updateModalCharacter({
        ...modalCharacter,
        topics: [newTopic, ...modalCharacter.topics],
      })
    );
  };

  const [editingTopic, setEditingTopic] = useState(initialTopicState);
  const [selectedField, setSelectedField] = useState("");

  const handleEditClick = (
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    field: string,
    topic: Topic
  ) => {
    setEditingTopic(topic);
    setSelectedField(field);
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    topicId: string
  ) => {
    const key = selectedField;
    const updatedTopics = modalCharacter.topics.map((topic) => {
      if (topic.id === topicId) {
        setEditingTopic({ ...topic, [key]: event.target.value });
        return { ...topic, [key]: event.target.value };
      } else {
        return topic;
      }
    });
    store.dispatch(
      updateModalCharacter({ ...modalCharacter, topics: updatedTopics })
    );
  };
  const handleInputBlur = async () => {
    await fetchUpdateTopic(editingTopic);
    setEditingTopic(initialTopicState);
  };

  const onDeleteHandle = async (topicId: string) => {
    setEditingTopic(initialTopicState);
    const updatedTopics = modalCharacter.topics.filter((topic) => {
      if (topic.id !== topicId) return topic;
    });
    store.dispatch(
      updateModalCharacter({ ...modalCharacter, topics: updatedTopics })
    );
    await fetchDeleteTopic(topicId);
  };
  const createTagHandler = async (Keyword: string) => {
    await requestCreateCharacter(Keyword, id);
    setSearchKeyword("");
    setSuggestion("");
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
      {!isFirsRender && displayCharacters.length > 0 ? (
        <ScrollContainer>
          {displayCharacters.map((character) => (
            <div key={character.id}>
              {character.name}
              <button onClick={() => addTagHandler(character)}>は追加</button>
            </div>
          ))}
        </ScrollContainer>
      ) : (
        suggestion && (
          <div>
            {suggestion}
            <button onClick={() => createTagHandler(suggestion)}>
              タグとして追加する
            </button>
          </div>
        )
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
            {modalCharacter.character.name}個別ページへ
          </button>
          <button onClick={deleteRelation}>紐づきを解消する</button>
          <div>
            <p>topics</p>
            <Button onClick={() => addTopicHandler()}>Add topic</Button>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Updated at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modalCharacter.topics.map((topic) => (
                  <div key={topic.id}>
                    <button onClick={() => onDeleteHandle(topic.id)}>
                      削除
                    </button>
                    <TableRow key={topic.id}>
                      <TableCell
                        onClick={(event) =>
                          handleEditClick(event, "title", topic)
                        }
                      >
                        {editingTopic.id === topic.id &&
                        selectedField === "title" ? (
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(event) => handleChange(event, topic.id)}
                            onBlur={handleInputBlur}
                          />
                        ) : (
                          <span>{topic.title}</span>
                        )}
                      </TableCell>
                      <TableCell
                        onClick={(event) =>
                          handleEditClick(event, "content", topic)
                        }
                      >
                        {editingTopic.id === topic.id &&
                        selectedField === "content" ? (
                          <input
                            type="text"
                            value={topic.content || ""}
                            onChange={(event) => handleChange(event, topic.id)}
                            onBlur={handleInputBlur}
                          />
                        ) : (
                          <span>{topic.content}</span>
                        )}
                      </TableCell>
                      <TableCell>{topic.updated_at}</TableCell>
                    </TableRow>
                  </div>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CharacterForm;
