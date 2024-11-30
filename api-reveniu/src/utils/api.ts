import axios from 'axios'

import config from "./config";

const reveniuApiInstance = axios.create({
  baseURL: `${config.integration}`,
  headers: {
    'Reveniu-Secret-Key': `${config.reveniuSecret}`,
    'Content-Type': 'application/json'
  },
});

export {reveniuApiInstance}