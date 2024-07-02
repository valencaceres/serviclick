import axios from "axios";

import { config } from "@/utils/config";

const apiInstance = axios.create({
  baseURL: `${config?.server}/api`,
  headers: { id: config?.apiKey },
});

export { apiInstance };
