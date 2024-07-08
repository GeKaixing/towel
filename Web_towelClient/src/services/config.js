import axios from "axios";

// 从环境变量中获取 API 基础 URL
/* global process */
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 从 localStorage 中获取登录数据
const localStorageData = JSON.parse(localStorage.getItem('loginData'));

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

export { auth, open };
