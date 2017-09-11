
const routes = [
	{ path: '/', redirect:{name:'home'}},
	{ path: '/home',name:'home', component: r => require.ensure([], () => r(require('../page/home.vue')), 'home' )},
];

module.exports = routes;