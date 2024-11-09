import React from 'react';
import ReactDOM from 'react-dom/client';
// import './env/index'
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import '../src/styles/index.css'
const rootHtml:HTMLElement|null= document.getElementById('root');
if(!rootHtml) throw new Error('root element not found');
const root = ReactDOM.createRoot(rootHtml);
document.documentElement.style.fontSize = 100 / 750 + 'vm';
document.body.setAttribute('color-model', `light`);
root.render(
    <BrowserRouter>
            <App></App>
    </BrowserRouter>
);
