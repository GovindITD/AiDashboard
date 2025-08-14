import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";

export const AIClientQuestionMaster = async () => {
  try {
    const url = `${apiUrls?.AIReportsAIClientQuestionMaster}?clientCode=11`;

    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (e) {
    throw e;
  }
};
