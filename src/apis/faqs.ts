import axios from "axios";
import { faqDetail, faqs } from "../config/urls";
import { Faq, UserManipulateOpts } from "../utils/type";

export const fetchUpdateFaq = async (faq: Faq) => {
  const faqId = faq.id;
  return await axios.put(faqDetail(faqId), { faq });
};
export const fetchDeleteFaq = async (faqId: string) => {
  return await axios.delete(faqDetail(faqId));
};
export const fetchCreateFaq = async (name: string, content: string) => {
  return await axios.post(faqs, { faqs: { name, content } });
};
type FaqType = "inspiredFaqs" | "appliedFaqs";
export const fetchAddFaq = async (
  name: string,
  content: string,
  faqType: FaqType,
  appointId: string
) => {
  // if faqType"inspiredFaqs" "appliedFaqs";
  let type = "";
  switch (faqType) {
    case "inspiredFaqs":
      type = "inspired_appoint";
      break;
    case "appliedFaqs":
      type = "applied_appoint";
      break;

    default:
      break;
  }
  return await axios.post(faqs, {
    faq: { name, content, faq_type: type, appoint_id: appointId },
  });
};

export const fetchFaqIndex = async (dataQtl: number) => {
  return axios.get(faqs, { params: { data_qty: dataQtl } });
};
