import axios from "axios";

import createLogger from "../util/logger";

const axiosMonitored = async (
  httpVerb: "get" | "post" | "delete" | "put",
  url: string,
  body: any,
  apiKey: any
) => {
  createLogger.info({
    url,
    method: httpVerb.toUpperCase(),
    body: body || "",
    params: "",
    query: "",
  });

  const emailResponse: any = await axios[httpVerb](url, body, {
    headers: apiKey,
  });
};

export default axiosMonitored;
