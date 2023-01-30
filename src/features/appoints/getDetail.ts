import { fetchAppointDetail } from "../../apis/appoint";
import {
  updateEditingAppoint,
  updateFaqs,
  updateInsights,
} from "../../redux/reducers/appoints";
import store from "../../redux/store";
import { Appoint, Faq, Insights } from "../../utils/type";

export const requestAppointDetail = async (id: string) => {
  type Data = {
    appoints: {
      appoint: Appoint;
      faqs: { inspired_faqs: Faq[]; applied_faqs: Faq[] };
      insight: Insights;
    };
  };
  const { appoints } = await fetchAppointDetail(id).then(
    (res) => res.data as Data
  );
  const { appoint, faqs, insight } = appoints;
  store.dispatch(updateEditingAppoint(appoint));
  store.dispatch(updateFaqs(faqs));
  store.dispatch(updateInsights(insight));
};
