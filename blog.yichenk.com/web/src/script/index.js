import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route/route';

import MainNav from './component/nav.vue';

Vue.use(VueRouter);
const router = new VueRouter({
	routes
});

var vm = new Vue({
	router,
	components:{
		MainNav
	}
}).$mount('#app');

console.log(vm);