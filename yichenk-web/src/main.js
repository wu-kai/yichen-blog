// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import directive from './directives'
import util from './util'

require('./css/font-awesome.css');
require('./css/common.css');

Vue.use(VueBlu);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
