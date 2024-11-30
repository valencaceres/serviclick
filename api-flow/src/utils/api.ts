import axios from 'axios'

import config from "./config";

const flowApiInstance = axios.create({
  baseURL: `${config.flowUrl}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

export {flowApiInstance}