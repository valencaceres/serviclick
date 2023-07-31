import axios from "axios";
import Cookies from "js-cookie";
import { config } from "../utils/config";

const apiInstance = axios.create({
  baseURL: `${config.server}/api`,
  headers: { id: config.apiKey },
});

apiInstance.interceptors.request.use(
  (request) => {
    const sessionCookie = Cookies.get("__session");
    if (sessionCookie) {
      request.headers.Authorization = `Bearer ${sessionCookie}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiInstance };
