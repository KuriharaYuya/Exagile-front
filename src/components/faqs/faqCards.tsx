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
  return (
    <>
      <h3>{faqType}</h3>
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
                  <Typography
                    variant="subtitle1"
                    component="h4"
                    onClick={() => onEditHandler("name", faq)}
                  >
                    {faq.name}
                    <button onClick={() => onDeleteHandler(faq.id)}>
                      削除
                    </button>
                  </Typography>
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
      <button onClick={openModalHandler}>faqを追加する</button>
    </>
  );
};

export default FaqTable;
