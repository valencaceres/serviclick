import axios from "axios";

import config from "./config";

export const apiReveniu = axios.create({
  baseURL: `${config.reveniu.URL.base}`,
  headers: config.reveniu.apiKey,
});

export const apiServiClick = axios.create({
  baseURL: `https://api.serviclick.cl/api`,
  headers: { id: config.apiKey },
});
