import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FaqTable from "./faqTable";
type Props = {
  appointId: string;
};
const FaqsSection = ({ appointId }: Props) => {
  const { faqs } = useSelector((state: RootState) => state.appointReducer);
  const { inspiredFaqs, appliedFaqs } = faqs;
  return (
    <>
      <FaqTable
        key="inspiredFaqs"
        faqType="inspiredFaqs"
        faqs={inspiredFaqs}
        appointId={appointId}
      />
      <FaqTable
        key="appliedFaq"
        faqType="appliedFaqs"
        faqs={appliedFaqs}
        appointId={appointId}
      />
    </>
  );
};

export default FaqsSection;
