import Vue from 'vue';
import App from './App.vue';

import 'normalize.css';
Vue.config.productionTip = false;
var vm = new Vue({
  render: (h) => h(App),
}).$mount('#app');
console.log(vm);
