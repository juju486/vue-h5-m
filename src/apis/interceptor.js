import axios from 'axios';
import qs from 'qs';
import { closeToast, showFailToast, showLoadingToast, showToast } from 'vant';



const { VITE_BASE_API } = import.meta.env;

// create an axios instance
const instance = axios.create({
  baseURL: VITE_BASE_API,
  withCredentials: true,
  timeout: 5000,
  custom: {
    loading: true,
    toast: 0, // 0 code错误时提示，1 正确错误都提示，2 不提示
  },
  data: {},
  params: {}
});


let count = 0;

// request interceptor
instance.interceptors.request.use(
  (config) => {
    config.data = config.data || {};

    if (config.custom.loading) {
      count++;
      // loading
      showLoadingToast({
        forbidClick: true,
      });
    }

    //增加token

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
    clearLoading(response);
    const { data, config, status } = response;
    const { toast } = config.custom;
    if (status !== 200) return Promise.reject(data.result || data.data);
    // if the custom code is not 200, it is judged as an error.
    if (data.code !== 0) {
      if (toast != 2) showToast(data.msg);
      return Promise.reject(data.msg || 'Error');
    } else if (data.code === 0) {
      if (toast == 1) showToast(data.msg);
      return Promise.resolve(data.data);
    }
  },
  (error) => {
    clearLoading(error);
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

function clearLoading(response) {
  if (response.config.custom.loading) {
    //避免连续的请求造成加载框闪烁
    setTimeout(() => {
      count--;
      if (count < 1) {
        try {
          //清除加载框
          closeToast(true);
        } catch (e) {
          console.log(e);
        }
      }
    }, 200);
  }
}
