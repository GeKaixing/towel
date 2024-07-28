import React from 'react';
import ReactDOM from 'react-dom/client';
// import './env/index'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './index.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
document.documentElement.style.fontSize = 100 / 750 + 'vm';
document.body.setAttribute('color-model', `light`);
root.render(
    <BrowserRouter>
            <App></App>
    </BrowserRouter>
);
