import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
export default defineConfig({
  server:{
    open:true,//启动项目的时候启动浏览器
    port:3000,//设置端口
  },
  assetsInclude: ['**/*.md'], 
  plugins: [react()],
});
