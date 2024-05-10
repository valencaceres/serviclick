import nextconfig from '../next.config.mjs'

const config = {
    products: nextconfig.env?.WEB_PRODUCTS || '',
    server: nextconfig.env?.API_URL,
    apiKey: nextconfig.env?.API_KEY
  };  
export default config

