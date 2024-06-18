import {
	createSSRApp, useAttrs
} from "vue";
import * as Pinia from 'pinia';//uniapp 不支持最新版本
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	};
}
