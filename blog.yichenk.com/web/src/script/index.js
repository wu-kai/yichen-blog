import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route/route';

require('jQuery');
require('../css/style.css');

Vue.use(VueRouter);
import mainNav from './component/main-nav.vue';
import chart from './component/chart.vue';

Vue.component('main-nav', Vue.extend(mainNav));
Vue.component('chart', Vue.extend(chart));
const router = new VueRouter({
	routes
});

new Vue({
	router,
}).$mount('#app');
