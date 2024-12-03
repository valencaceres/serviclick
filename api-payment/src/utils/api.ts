import axios from 'axios'

import config from './config';

const flowApiInstance = axios.create({
  baseURL: `${config.flow}`,
  headers: {id: config.apiFlowKey}
});

const reveniuApiInstance = axios.create({
  baseURL: `${config.reveniu}`,
  headers: {id: config.apiReveniuKey}
});

export {flowApiInstance, reveniuApiInstance}