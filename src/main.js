import Vue from 'vue';

import axios from 'axios';

import router from './router';
import App from './App.vue';

import 'normalize.css';
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();
Vue.prototype.$http = axios;
var vm = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
console.log(vm);
