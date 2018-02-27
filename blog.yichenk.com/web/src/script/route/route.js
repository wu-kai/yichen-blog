
const routes = [
	{ path: '/', redirect:{name:'home'}},
	{ path: '/home',name:'home', component: r => require.ensure([], () => r(require('../page/home.vue')), 'home' )},
	{ path: '/blog',name:'blog', component: r => require.ensure([], () => r(require('../page/blog.vue')), 'blog' )},
	{ path: '/admin',name:'admin', component: r => require.ensure([], () => r(require('../page/admin/index.vue')), 'admin' )},
];

module.exports = routes;