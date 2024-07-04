import axios from "axios";
import config from "./config";

const apiInstace = axios.create({
  baseURL: `${config.server}/api`,
  headers: {
    id: config.apiKey,
  }
})