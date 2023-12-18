import axios from 'axios';
import qs from 'qs';
import { closeToast, showFailToast, showLoadingToast, showToast } from 'vant';



const { VITE_BASE_API } = import.meta.env;

// create an axios instance
const instance = axios.create({
  baseURL: VITE_BASE_API,
  withCredentials: true,
  timeout: 5000,
});

// request interceptor
instance.interceptors.request.use(
  (config) => {
    config.data = config.data || {};

    if (!config.hideLoading) {
      // loading
      showLoadingToast({
        forbidClick: true,
      });
    }

    const contentType = config.headers?.['content-type'] || config.headers?.['Content-Type'];

    if (config.method?.toLocaleUpperCase() == 'POST' && data) {
      if ('multipart/form-data;charset=UTF-8' == contentType) {
        const fd = new FormData();
        Object.keys(data).forEach((key) => fd.append(key, data[key]));
        config.data = fd;
      } else if ('application/x-www-form-urlencoded;charset=UTF-8' == contentType) {
        config.data = qs.stringify(config.data);
      }
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  (response) => {
    closeToast(true);
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 0) {
      showToast(res.msg);
      return Promise.reject(res.msg || 'Error');
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log('err' + error);
    showFailToast(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url, config) {
  // return useAxios(url, config, instance);
  return instance({ url, ...config });
}
