import axios from "axios";
import Cookies from "js-cookie";

import { config } from "../utils/config";

const apiInstance = axios.create({
  baseURL: `${config.server}/api`,
  headers: {
    id: config.apiKey,
  },
});

const apiInstanceUser = axios.create({
  baseURL: `${config.apiAuth}/api-auth`,
  headers: {

    id: config.apiKey,
  },
});


apiInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


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

export { apiInstance, apiInstanceUser };
