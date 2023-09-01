const CONFIG = {
  // 开发环境配置
  development: {
    baseUrl: '',
  },
  // 生产环境配置
  production: {
    baseUrl: '',
  }
};
export default CONFIG[process.env.NODE_ENV];
