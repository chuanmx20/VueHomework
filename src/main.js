import Vue from 'vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

import App from './App.vue'

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
