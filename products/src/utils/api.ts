import axios from "axios";

import { config } from "@/utils/config";

const envApp = "prod";

const apiInstance = axios.create({
  baseURL: `${config.server[envApp]}/api`,
  headers: { id: config.apiKey },
});

export { apiInstance };
