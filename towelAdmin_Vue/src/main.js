import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.productionTip = false;
app.use(createPinia())
app.use(router)
app.use(Antd);
app.mount('#app')
