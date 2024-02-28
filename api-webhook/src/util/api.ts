
import config from "./config";
import axios from "axios";
export const apiServiClick = axios.create({
    baseURL: config.apiURL,
    headers: { id: config.apiKEYSv },
  });
  