
import config from "./config";
import axios from "axios";
export const apiServiClick = axios.create({
    baseURL: `https://api.serviclick.cl/api`,
    headers: { id: config.apiKEYSv },
  });
  