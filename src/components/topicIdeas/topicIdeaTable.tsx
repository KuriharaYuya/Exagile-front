import { TableCell, TableRow } from "@mui/material";
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
    columnName: "title" | "content" | "";
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditingIdea({
      idea: { ...editingIdea.idea!, title: event.target.value },
      columnName: editingIdea.columnName,
    });
  };

  const onEditingHandler = (idea: TopicIdea, columnName: "title") => {
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
        headers={["title", "content", "created at", "updated at"]}
      >
        {data?.map((idea, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                {idea.id === editingIdea.idea?.id ? (
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
