import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
// 引入usequery使用文件
import { QueryClientProvider, QueryClient } from 'react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));
// 在入口文件配置usequery
//查询/mutation/修改使用react-query 
const queryClient = new QueryClient()
document.documentElement.style.fontSize = 100 / 750 + 'vm';
root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <App></App>
        </QueryClientProvider>
    </BrowserRouter>
);
