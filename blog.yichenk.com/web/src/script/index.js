import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route/route';

require('../css/style.css');

Vue.use(VueRouter);
import mainNav from './component/main-nav.vue';

Vue.component('main-nav', Vue.extend(mainNav));
const router = new VueRouter({
	routes
});

new Vue({
	router,
}).$mount('#app');
