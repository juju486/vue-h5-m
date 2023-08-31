const CONFIG = {
  // 开发环境配置
  development: {
    baseUrl: 'https://app2.zhangzhengyun.com',
  },
  // 生产环境配置
  production: {
    baseUrl: 'https://app2.zhangzhengyun.com',
  }
};
export default CONFIG[process.env.NODE_ENV];
