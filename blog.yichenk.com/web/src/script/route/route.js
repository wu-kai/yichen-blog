
const routes = [
	{ path: '/', redirect:{name:'home'}},
	{ path: '/home',name:'home', component: r => require.ensure([], () => r(require('../page/home.vue')), 'home' )},
	{ path: '/chart',name:'chart', component: r => require.ensure([], () => r(require('../page/chart.vue')), 'chart' )},
];

module.exports = routes;