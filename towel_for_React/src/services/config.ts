import axios from "axios";

// 从环境变量中获取 API 基础 URL
//@ts-ignore
const REACT_APP_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// 从 localStorage 中获取登录数据
const localStorageData = JSON.parse(localStorage.getItem('loginData')as string);

// 创建带有身份验证的 Axios 实例
const auth = axios.create({
    baseURL: REACT_APP_API_BASE_URL,
    method:'post',
    headers: {
        'Authorization': `Bearer ${localStorageData?.jwt}`,
    }
});

// 创建不带身份验证的 Axios 实例
const open = axios.create({
    baseURL: REACT_APP_API_BASE_URL,
});

/* // 请求拦截器
auth.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如，可以在这里添加认证 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 处理请求错误
    return Promise.reject(error);
  }
); */
/* 
// 响应拦截器
auth.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 处理响应错误
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      switch (error.response.status) {
        case 400:
          console.error('Bad Request: ', error.response.data);
          break;
        case 401:
          console.error('Unauthorized: ', error.response.data);
          // 可以在这里做一些重新登录的操作
          break;
        case 403:
          console.error('Forbidden: ', error.response.data);
          break;
        case 404:
          console.error('Not Found: ', error.response.data);
          break;
        case 500:
          console.error('Internal Server Error: ', error.response.data);
          break;
        default:
          console.error('Error: ', error.response.data);
      }
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      console.error('No Response: ', error.request);
    } else {
      // 发送请求时出了点问题
      console.error('Error: ', error.message);
    }
    return Promise.reject(error);
  }
); */


export { auth, open };
