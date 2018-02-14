import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './route/route';

require('jQuery');
require('../css/style.css');
require('../../../lib/bootstrap/css/bootstrap.css');

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
	mounted: function () {
		$(window).bind('mousewheel', function (event) {
			var $nav       = $('nav'),
				navpadding = parseInt($nav.css('padding').split(' ')[0]),
				navHeight  = navpadding * 2 + $nav.height();
			if (event.originalEvent.wheelDelta >= 0) {
				console.log('Scroll up');
				$nav.animate({
					top: '0'
				}, 100);
			}
			else {
				$nav.animate({
					top: '-' + navHeight + 'px'
				}, 100);
			}
		});
	}
}).$mount('#app');
