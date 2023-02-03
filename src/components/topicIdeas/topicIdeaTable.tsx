import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestTopicIdeas } from "../../features/topicIdeas";
import { RootState } from "../../redux/store";
import TablePaginate from "../tablePaginate";
import { TopicIdea } from "../../utils/type";
import { updateTopicIdeas } from "../../redux/reducers/character";
import { fetchAddTopicIdea, fetchUpdateTopicIdea } from "../../apis/topicIdeas";
type Props = {
  characterId: string;
};
const TopicIdeaTable = ({ characterId }: Props) => {
  const dispatch = useDispatch();
  const { topicIdeas } = useSelector(
    (state: RootState) => state.characterReducer
  );
  useEffect(() => {
    (async () => {
      await requestTopicIdeas(characterId, 0);
    })();
  }, []);
  const { ideas, length } = topicIdeas;
  const [pageState, setPageState] = useState(0);
  const rowsPerPageState = 5;
  const handleChangePage = (e: any, newPage: number) => {
    setPageState(newPage);
  };
  const [data, setData] = useState<TopicIdea[] | undefined>(undefined);
  const [editingIdea, setEditingIdea] = useState<{
    idea: TopicIdea | undefined;
    columnName: "title" | "content" | "idea_type" | "";
  }>({ idea: undefined, columnName: "" });
  useEffect(() => {
    const slicedData = ideas?.slice(
      pageState * rowsPerPageState,
      pageState * rowsPerPageState + rowsPerPageState
    );
    setData(slicedData);
  }, [ideas, pageState]);
  const inputRef = useRef<HTMLInputElement>(null);
  const onAddTopicIdea = () => {
    const newTopicIdea = {
      id: `${ideas.length}`,
      title: "",
      content: "",
      appoint_id: "",
      created_at: "",
      updated_at: "",
      done: false,
      idea_type: "話題",
    };
    const newTopicIdeas = {
      ideas: [newTopicIdea, ...topicIdeas.ideas],
      length: length + 1,
    };
    dispatch(updateTopicIdeas(newTopicIdeas));
    setEditingIdea({ idea: newTopicIdea, columnName: "title" });
  };
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      // dispatch(updateTopicIdeas(newTopicIdeas)); を非同期で呼び出しているのでsetTimeoutが必要。
    }, 0);
  }, [editingIdea]);

  const onBlurHandler = async () => {
    if (editingIdea.idea?.title === "" && editingIdea.idea.created_at === "") {
      const removedIdeas = ideas.filter((idea) => {
        if (idea.id !== editingIdea.idea?.id) return idea;
      });
      const updateIdeas = { ideas: removedIdeas, length: length - 1 };
      dispatch(updateTopicIdeas(updateIdeas));
    } else if (editingIdea.idea?.created_at === "") {
      type res = {
        idea: TopicIdea;
        length: number;
      };
      const { idea, length }: res = await fetchAddTopicIdea(
        characterId,
        editingIdea.idea
      ).then((res) => res.data);
      const updatedIdeas = topicIdeas.ideas.map((tgtIdea) => {
        if (tgtIdea.created_at === "") {
          return idea;
        } else {
          return tgtIdea;
        }
      });
      dispatch(updateTopicIdeas({ ideas: updatedIdeas, length }));
    } else {
      const { idea }: { idea: TopicIdea } = await fetchUpdateTopicIdea(
        editingIdea.idea!
      ).then((res) => res.data);
      const updatedIdeas = topicIdeas.ideas.map((tgtIdea) => {
        if (tgtIdea.id === idea.id) {
          return idea;
        } else {
          return tgtIdea;
        }
      });
      dispatch(updateTopicIdeas({ ideas: updatedIdeas, length }));
    }
    setEditingIdea({ idea: undefined, columnName: "" });
  };
  const onColumnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const columnType = editingIdea.columnName;
    const updatedIdea = {
      idea: { ...editingIdea.idea!, [columnType]: event.target.value },
      columnName: columnType,
    };
    if (columnType === "idea_type") {
      (async () => {
        const { idea }: { idea: TopicIdea } = await fetchUpdateTopicIdea(
          updatedIdea.idea
        ).then((res) => res.data);
        const updatedIdeas = topicIdeas.ideas.map((tgtIdea) => {
          if (tgtIdea.id === idea.id) {
            return idea;
          } else {
            return tgtIdea;
          }
        });
        dispatch(updateTopicIdeas({ ideas: updatedIdeas, length }));
      })();
    } else {
      setEditingIdea(updatedIdea);
    }

    setEditingIdea({ idea: undefined, columnName: "" });
  };

  const onEditingHandler = (
    idea: TopicIdea,
    columnName: "title" | "idea_type"
  ) => {
    setEditingIdea({ idea, columnName });
  };
  return (
    <>
      <button onClick={onAddTopicIdea}>ideaを追加する</button>
      <TablePaginate
        count={length}
        rowsPerPage={rowsPerPageState}
        pageState={pageState}
        onPageChange={handleChangePage}
        headers={["title", "content", "idea_type", "created at", "updated at"]}
      >
        {data?.map((idea, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {idea.id === editingIdea.idea?.id &&
                editingIdea.columnName === "title" ? (
                  <input
                    type="text"
                    value={editingIdea.idea && editingIdea.idea.title}
                    ref={inputRef}
                    onChange={(e) => onColumnChangeHandler(e)}
                    onBlur={onBlurHandler}
                  />
                ) : (
                  <p onClick={() => onEditingHandler(idea, "title")}>
                    {idea.title}
                  </p>
                )}
              </TableCell>
              <TableCell>{idea.content}</TableCell>
              {idea.id === editingIdea.idea?.id &&
              editingIdea.columnName === "idea_type" ? (
                <Select
                  value={editingIdea.idea.idea_type}
                  onChange={(e) => onColumnChangeHandler(e)}
                >
                  <MenuItem value={"話題"}>話題</MenuItem>
                  <MenuItem value={"行動"}>行動</MenuItem>
                </Select>
              ) : (
                <TableCell onClick={() => onEditingHandler(idea, "idea_type")}>
                  {idea.idea_type}
                </TableCell>
              )}
              <TableCell>{idea.created_at}</TableCell>
              <TableCell>{idea.updated_at}</TableCell>
            </TableRow>
          );
        })}
      </TablePaginate>
    </>
  );
};

export default TopicIdeaTable;
