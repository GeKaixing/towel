import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
// 引入usequery使用文件
const root = ReactDOM.createRoot(document.getElementById('root'));
// 在入口文件配置usequery
//查询/mutation/修改使用react-query 
document.documentElement.style.fontSize = 100 / 750 + 'vm';
document.body.setAttribute('color-model', `light`);
root.render(
    <BrowserRouter>
            <App></App>
    </BrowserRouter>
);
