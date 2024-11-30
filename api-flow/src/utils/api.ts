import axios from 'axios'

import config from './config';

const flowApiInstance = axios.create({
  baseURL: `${config.apiFlow}`,
  headers: {id: config.apiKey}
});

const ApiInstance = axios.create({
  baseURL: `${config.apiUrl}`,
  headers: {id: config.apiKey}
});

export {flowApiInstance, ApiInstance}