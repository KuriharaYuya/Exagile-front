import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateInsight } from "../../apis/appoint";
import { fetchDeleteInsight, fetchInsightUpdate } from "../../apis/insight";
import { updateInsights } from "../../redux/reducers/appoints";
import { RootState } from "../../redux/store";
import { Insight } from "../../utils/type";

type Props = {
  appointId: string;
};

const Insights = ({ appointId }: Props) => {
  const { insights } = useSelector((state: RootState) => state.appointReducer);
  const dispatch = useDispatch();
  const [editingInsight, setEditingInsight] = useState<{
    tgtInsight: Insight | undefined;
    columnName: "title" | "content" | "";
  }>({ tgtInsight: undefined, columnName: "" });

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSetEditingInsight = (
    tgtInsight: Insight,
    columnName: "title" | "content"
  ) => {
    setEditingInsight({ tgtInsight, columnName });
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingInsight]);

  const handleBlur = async (insight: Insight) => {
    await fetchInsightUpdate(insight);
    setEditingInsight({ tgtInsight: undefined, columnName: "" });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    tgtInsight: Insight
  ) => {
    const updatedInsight = insights.map((insight) => {
      if (insight.id === editingInsight.tgtInsight?.id) {
        return { ...tgtInsight, [editingInsight.columnName]: e.target.value };
      } else {
        return insight;
      }
    });
    dispatch(updateInsights(updatedInsight));
  };

  const addInsightHandler = async () => {
    const { insight } = await fetchCreateInsight(appointId).then(
      (res) => res.data
    );
    dispatch(updateInsights([insight, ...insights]));
    handleSetEditingInsight(insight, "title");
  };

  const onDeleteHandler = async (insightId: string) => {
    await fetchDeleteInsight(insightId);
    const updatedInsights = insights.filter((insight) => {
      if (insight.id !== insightId) return insight;
    });
    dispatch(updateInsights(updatedInsights));
  };

  return (
    <div>
      <br />
      <br />
      <div>
        <button onClick={addInsightHandler}>add insight</button>
        {insights.map((insight, index) => {
          const tgtInsight = editingInsight.tgtInsight;
          return (
            <h2 key={index}>
              {tgtInsight?.id === insight.id &&
              editingInsight.columnName === "title" ? (
                <input
                  type="text"
                  ref={inputRef}
                  value={insight.title}
                  onBlur={() => handleBlur(insight)}
                  onChange={(e) => handleChange(e, insight)}
                />
              ) : (
                <p onClick={() => handleSetEditingInsight(insight, "title")}>
                  {insight.title}
                </p>
              )}
              {tgtInsight?.id === insight.id &&
              editingInsight.columnName === "content" ? (
                <textarea
                  ref={textareaRef}
                  value={insight.content!}
                  onBlur={() => handleBlur(insight)}
                  onChange={(e) => handleChange(e, insight)}
                />
              ) : (
                <p onClick={() => handleSetEditingInsight(insight, "content")}>
                  {insight?.content ? (
                    insight.content
                  ) : (
                    <textarea
                      placeholder="コンテンツを記入しよう"
                      onClick={() =>
                        handleSetEditingInsight(insight, "content")
                      }
                    ></textarea>
                  )}
                </p>
              )}
              <button onClick={() => onDeleteHandler(insight.id)}>
                削除する
              </button>
            </h2>
          );
        })}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Insights;
