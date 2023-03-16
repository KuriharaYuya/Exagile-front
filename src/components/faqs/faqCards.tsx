import {
  Button,
  Card,
  CardContent,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Faq } from "../../utils/type";
import { formatRubyDateTimeToJs } from "../../utils/dateTime";
import {
  requestAddFaq,
  requestDeleteFaq,
  requestUpdateFaq,
} from "../../features/faqs/faqs";
import { useForm } from "react-hook-form";
import { apiLocalhost } from "../../config/urls";
import { useDispatch, useSelector } from "react-redux";
import { updateFaqs } from "../../redux/reducers/appoints";
import { RootState } from "../../redux/store";

const FaqCard = styled(Card)`
  min-width: 275px;
  margin: 10px 0;
`;
type FaqType = "inspiredFaqs" | "appliedFaqs";

type Props = {
  faqs: Faq[] | undefined;
  faqType: FaqType;
  appointId: string;
};
const FaqTable = ({ faqs, faqType, appointId }: Props) => {
  const dispatch = useDispatch();
  const faqsState = useSelector(
    (state: RootState) => state.appointReducer.faqs
  );
  type ColumnType = "name" | "content";
  type EditingFaq = {
    columnType: ColumnType | undefined;
    faq: Faq | undefined;
  };
  const [editingFaq, setEditingFaq] = useState<EditingFaq>({
    columnType: undefined,
    faq: undefined,
  });
  const onEditHandler = (columnType: "name" | "content", tgtFaq: Faq) => {
    setEditingFaq({ columnType, faq: tgtFaq });
  };
  const onEndEditHandler = async (columType: string) => {
    await requestUpdateFaq(editingFaq.faq!, columType, faqType as FaqType);
    setEditingFaq({ columnType: undefined, faq: undefined });
  };
  const onColumnChangeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    columnName: ColumnType
  ) => {
    const { value } = event.target;
    const updatedData = {
      ...editingFaq,
      faq: {
        ...editingFaq.faq!,
        [columnName]: value,
      },
    };
    setEditingFaq(updatedData);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editingFaq.faq]);
  const onDeleteHandler = async (faqId: string) => {
    await requestDeleteFaq(faqId, faqType);
  };
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const addFaqHandler = async ({ name, content }: any) => {
    await requestAddFaq(name, content, faqType, appointId);
    reset();
    handleClose();
  };
  const openModalHandler = () => {
    setIsOpen(true);
  };
  const [searchFaq, setSearchFaq] = useState<Faq[] | undefined>(undefined);
  const [faqFocused, setFaqFocused] = useState(false);
  const [searchFaqKeyword, setSearchFaqKeyword] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (!searchFaqKeyword) {
      return;
    } else if (searchFaqKeyword.length === 0) {
      setSearchFaq(undefined);
      return;
    }
    // 一秒間入力がなければ検索
    const timer = setTimeout(async () => {
      const faqs = await apiLocalhost
        .get("/suggest_applied_faq", {
          params: { faqs: { keyword: searchFaqKeyword } },
        })
        .then((res) => res.data.faqs);
      setSearchFaq(faqs);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchFaqKeyword]);
  const onChangeSearchFaqKeywordHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchFaqKeyword(value);
    const faqs = await apiLocalhost
      .get("/suggest_applied_faq", { params: { keyword: searchFaqKeyword } })
      .then((res) => res.data.faqs);
  };
  const onFocusSearchFaqHandler = async () => {
    const faqs = await apiLocalhost
      .get("/suggest_applied_faq")
      .then((res) => res.data.faqs);
    setSearchFaq(faqs);
    setFaqFocused(true);
  };
  const addAppliedFaqHandler = async (faqId: string) => {
    const appliedFaq: Faq = await apiLocalhost
      .post("/applied_faqs", {
        applied_faq: { faq_id: faqId, appoint_id: appointId },
      })
      .then((res) => res.data.applied_faq);
    const updatedAppliedFaqs = faqsState.appliedFaqs?.concat(appliedFaq);
    const updatedFaqs = { ...faqsState, appliedFaqs: updatedAppliedFaqs };
    dispatch(updateFaqs(updatedFaqs));
  };
  const onDeleteRelationHandler = async (faqId: string) => {
    await apiLocalhost.delete(`/applied_faqs/${faqId}`, {
      params: {
        applied_faq: { appoint_id: appointId },
      },
    });
    const updatedAppliedFaqs = faqsState.appliedFaqs?.filter(
      (faq) => faq.id !== faqId
    );
    const updatedFaqs = { ...faqsState, appliedFaqs: updatedAppliedFaqs };
    dispatch(updateFaqs(updatedFaqs));
  };
  return (
    <>
      <h3>{faqType}</h3>
      {faqType === "appliedFaqs" && (
        <>
          <TextField
            id="outlined-basic"
            label="faqを検索"
            variant="outlined"
            onFocus={onFocusSearchFaqHandler}
            onChange={onChangeSearchFaqKeywordHandler}
            value={searchFaqKeyword}
          />
          {(faqFocused || searchFaqKeyword) &&
            searchFaq?.map((faq, index) => {
              return (
                <div key={index}>
                  <p>{faq.name}</p>
                  <button onClick={() => addAppliedFaqHandler(faq.id)}>
                    add as appliedFaq
                  </button>
                </div>
              );
            })}
        </>
      )}
      <div>
        {faqs?.map((faq, index) => {
          return (
            <FaqCard key={index}>
              <CardContent>
                {faq &&
                editingFaq.faq?.id === faq.id &&
                editingFaq.columnType === "name" ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={editingFaq.faq.name}
                    onChange={(e) => onColumnChangeHandler(e, "name")}
                    onBlur={() => onEndEditHandler("name")}
                  />
                ) : (
                  <>
                    <Typography
                      variant="subtitle1"
                      component="h4"
                      onClick={() => onEditHandler("name", faq)}
                    >
                      {faq.name}
                    </Typography>
                    {faqType === "inspiredFaqs" ? (
                      <button onClick={() => onDeleteHandler(faq.id)}>
                        削除
                      </button>
                    ) : (
                      <button onClick={() => onDeleteRelationHandler(faq.id)}>
                        delete relation
                      </button>
                    )}
                  </>
                )}
                {faq &&
                editingFaq.faq?.id === faq.id &&
                editingFaq.columnType === "content" ? (
                  <textarea
                    ref={textareaRef}
                    value={editingFaq.faq.content}
                    onChange={(e) => onColumnChangeHandler(e, "content")}
                    onBlur={() => onEndEditHandler("content")}
                  />
                ) : (
                  <Typography
                    variant="subtitle1"
                    component="h4"
                    onClick={() => onEditHandler("content", faq)}
                  >
                    {faq.content}
                  </Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  updated at: {formatRubyDateTimeToJs(faq.updated_at)}
                  {/* updated at: {formatDateTimeLocal(faq.updated_at)} */}
                </Typography>
              </CardContent>
            </FaqCard>
          );
        })}
      </div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          padding: "45px",
        }}
      >
        <form onSubmit={handleSubmit(addFaqHandler)}>
          {`${faqType}に新規追加します`}
          <TextField label="Name" {...register("name", { required: true })} />
          <TextField
            label="content"
            {...register("content", { required: true })}
          />
          <Button type="submit">Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </form>
      </Modal>
      {faqType === "inspiredFaqs" && (
        <button onClick={openModalHandler}>faqを追加する</button>
      )}
    </>
  );
};

export default FaqTable;
