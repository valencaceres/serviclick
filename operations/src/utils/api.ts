import axios from "axios";
import Cookies from "js-cookie";

import { config } from "../utils/config";

const apiInstance = axios.create({
  baseURL: `${config.server}/api`,
  headers: {
    id: config.apiKey,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
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
