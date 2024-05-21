import axios from "axios";

import { config } from "../utils/config";

const apiInstance = axios.create({
  baseURL: `${config.server}/api`,
  headers: { id: config.apiKey },
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
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    } else {
        console.error("config or config.headers is undefined");
    }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const get = async (path: string) => {
  const { apiKey, server } = config;
  try {
    const response = await axios.get(`${server}/api/${path}`, {
      headers: {
        id: apiKey,
      },
    });

    return responseFromAPI(response.data, null);
  } catch (e) {
    return responseFromAPI((e as any).request.status, (e as Error).message);
  }
};

const post = async (path: string, data: any) => {
  const { apiKey, server } = config;
  try {
    const response = await axios.post(`${server}/api/${path}`, data, {
      headers: {
        id: apiKey,
      },
    });

    return responseFromAPI(response.data, null);
  } catch (e) {
    return responseFromAPI((e as any).request.status, (e as Error).message);
  }
};

const erase = async (path: string) => {
  const { apiKey, server } = config;
  try {
    const response = await axios.delete(`${server}/api/${path}`, {
      headers: {
        id: apiKey,
      },
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

export { apiInstance, get, post, erase, apiInstanceUser };
