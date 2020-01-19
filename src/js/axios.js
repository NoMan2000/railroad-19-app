// @flow
import axiosLib from 'axios';
import 'nprogress/nprogress.css';

import NProgress from 'nprogress';

const axios = axiosLib.create();

const calculatePercentage = (loaded, total) => Math.floor(loaded * 1.0) / total;

export const load = (config: *) => {
  NProgress.configure(config);
};
load({ parent: '#root' });

const progress = e => {
  const percentage = calculatePercentage(e.loaded, e.total);
  NProgress.set(percentage);
};

axios.defaults.onDownloadProgress = progress;
axios.defaults.onUploadProgress = progress;

axios.interceptors.response.use(response => {
  NProgress.done(true);
  return response;
});

axios.interceptors.request.use(
  async config => {
    const localHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true'
    };
    let jwtObj = {};
    const jwt = localStorage.getItem('jwt') || '';
    if (jwt) {
      jwtObj = { Authorization: `Bearer ${jwt}` };
    }
    return {
      ...config,
      headers: {
        // $FlowFixMe
        ...config.headers,
        ...localHeaders,
        ...jwtObj
      }
    };
  },
  error => {
    return Promise.reject(error);
  }
);

export const createCancelSource = () => axiosLib.CancelToken.source();
export { axios };
