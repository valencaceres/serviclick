import axios from "axios";

import createLogger from "../util/logger";

const axiosMonitored = async (
  httpVerb: "get" | "post" | "delete" | "put",
  url: string,
  body: any,
  apiKey: any
) => {
  try {
    createLogger.info({
      url,
      method: httpVerb.toUpperCase(),
      body: body || "",
      apiKey,
      params: "",
      query: "",
    });

    const response: any = body
      ? await axios[httpVerb](url, body, {
          headers: apiKey,
        })
      : await axios[httpVerb](url, {
          headers: apiKey,
        });

    return { success: true, data: response.data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export default axiosMonitored;
