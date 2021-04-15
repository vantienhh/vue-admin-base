import Token from '@/services/token';
import axios from 'axios';
import { App } from '@vue/runtime-core';
import { getBaseApiUri } from '@/services/helper';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || '';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

const config = {
  baseURL: getBaseApiUri()
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = Token.getTokenFromStorage();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default {
  install: (app: App): void => {
    app.use(function (Vue: App) {
      // @ts-ignore
      Vue.axios = _axios;
      // @ts-ignore
      window.axios = _axios;
    });
  }
};
