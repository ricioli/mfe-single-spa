import axios from 'axios';
import handleExpiredSession from './handleExpiredSession';

const local = process.env.NODE_ENV !== 'production';
const hml = true;
const baseURL: string = local
  ? 'http://host.docker.internal:8010'
  : hml
  ? 'https://hfssiaq3qi.execute-api.us-east-1.amazonaws.com/hml-stage'
  : 'https://hfssiaq3qi.execute-api.us-east-1.amazonaws.com/prd-stage';

const instance = {
  local,
  hml,
  axios: axios.create({
    baseURL,
    responseType: 'json',
  }),
};

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

instance.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.request.responseURL.includes(baseURL) &&
      error.response?.status === 401 &&
      !error.config.headers['X-No-Redirect-401']
    ) {
      handleExpiredSession();
    }

    return Promise.reject(error);
  },
);

export default instance;
