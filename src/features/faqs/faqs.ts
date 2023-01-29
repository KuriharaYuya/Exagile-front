import {
  fetchAddFaq,
  fetchDeleteFaq,
  fetchFaqIndex,
  fetchUpdateFaq,
} from "../../apis/faqs";
import { updateFaqs } from "../../redux/reducers/appoints";
import { updateFaqIndex } from "../../redux/reducers/faq";
import store from "../../redux/store";
import { Faq } from "../../utils/type";
type FaqType = "inspiredFaqs" | "appliedFaqs";
export const requestUpdateFaq = async (
  editingFaq: Faq,
  type: string,
  faqType: FaqType
) => {
  const { faqs } = store.getState().appointReducer;
  const tgtFaqs = faqs[faqType]!;
  const updatedFaqs = tgtFaqs.map((faq) => {
    if (faq.id === editingFaq.id) {
      return editingFaq;
    } else {
      return faq;
    }
  });
  await fetchUpdateFaq(editingFaq);
  store.dispatch(updateFaqs({ ...faqs, [faqType]: updatedFaqs }));
};

export const requestDeleteFaq = async (
  deletingFaqId: string,
  faqType: FaqType
) => {
  const { faqs } = store.getState().appointReducer;
  const tgtFaqs = faqs[faqType]!;
  const updatedFaqs = tgtFaqs.filter((faq) => {
    if (faq.id !== deletingFaqId) {
      return faq;
    }
  });
  await fetchDeleteFaq(deletingFaqId);
  store.dispatch(updateFaqs({ ...faqs, [faqType]: updatedFaqs }));
};

export const requestAddFaq = async (
  name: string,
  content: string,
  faqType: FaqType,
  appointId: string
) => {
  const newFaq = await fetchAddFaq(name, content, faqType, appointId).then(
    (res) => res.data.faq
  );
  const { faqs } = store.getState().appointReducer;
  const tgtFaqs = faqs[faqType]!;
  const updatedTgtFaqs = [newFaq, ...tgtFaqs];
  store.dispatch(updateFaqs({ ...faqs, [faqType]: updatedTgtFaqs }));
};

export const requestFaqDataSets = async (dataQtl: number) => {
  const { faqs, length, options } = await fetchFaqIndex(dataQtl).then(
    (res) => res.data
  );
  store.dispatch(updateFaqIndex({ faqs, length, manipulateOpts: options }));
};
