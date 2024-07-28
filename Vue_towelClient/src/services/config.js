import axios  from "axios";
export const  http = axios.create({
    baseURL: 'http://127.0.0.1:4000/',
    timeout: 1000,
  });
  // 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 比如：添加授权头部
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
// 响应拦截器
http.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 统一处理响应错误
    if (error.response) {
      // 服务器返回的响应状态码不是 2xx
      switch (error.response.status) {
        case 401:
          // 处理未授权错误
          console.error('未授权，请重新登录');
          break;
        case 403:
          // 处理禁止访问错误
          console.error('禁止访问');
          break;
        case 404:
          // 处理资源未找到错误
          console.error('资源未找到');
          break;
        case 500:
          // 处理服务器内部错误
          console.error('服务器内部错误');
          break;
        default:
          // 处理其他错误
          console.error(`错误: ${error.response.status}`);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('网络错误，请稍后重试');
    } else {
      // 处理其他错误
      console.error('请求失败:', error.message);
    }
    return Promise.reject(error);
  }
);
