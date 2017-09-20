
const routes = [
	{ path: '/', redirect:{name:'bbChart'}},
	{ path: '/home',name:'home', component: r => require.ensure([], () => r(require('../page/home.vue')), 'home' )},
	{ path: '/blog',name:'blog', component: r => require.ensure([], () => r(require('../page/blog.vue')), 'blog' )},
	{ path: '/chart',name:'chart', component: r => require.ensure([], () => r(require('../page/chart.vue')), 'chart' )},
	{ path: '/bbChart',name:'bbChart', component: r => require.ensure([], () => r(require('../page/bbChart.vue')), 'bbChart' )},
];

module.exports = routes;