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

const requestHeaders = () => {
  const sessionCookie = Cookies.get("__session");
  return {
    id: config.apiKey,
    Authorization: sessionCookie ? `Bearer ${sessionCookie}` : undefined,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
};

const get = async (path: string) => {
  const { server } = config;
  try {
    const response = await axios.get(`${server}/api/${path}`, {
      headers: requestHeaders(),
    });

    return responseFromAPI(response.data, null);
  } catch (e) {
    return responseFromAPI((e as any).request.status, (e as Error).message);
  }
};

const post = async (path: string, data: any) => {
  const { server } = config;
  try {
    const response = await axios.post(`${server}/api/${path}`, data, {
      headers: requestHeaders(),
    });

    return responseFromAPI(response.data, null);
  } catch (e) {
    return responseFromAPI((e as any).request.status, (e as Error).message);
  }
};

const erase = async (path: string) => {
  const { server } = config;
  try {
    const response = await axios.delete(`${server}/api/${path}`, {
      headers: requestHeaders(),
    });

    return responseFromAPI(response.data, null);
  } catch (e) {
    return responseFromAPI((e as any).request.status, (e as Error).message);
  }
};

const responseFromAPI = (data: any, error: string | null) => {
  return {
    success: !error,
    data,
    error,
  };
};

export { apiInstance, get, post, erase };
