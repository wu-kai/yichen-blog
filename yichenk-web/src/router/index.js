import Vue from 'vue'
import Router from 'vue-router'
import CreateBlog from '@/components/CreateBlog'
import Home from '@/components/Home'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/Home', name: 'Home', component: Home},
    {path: '/createBlog', name: 'CreateBlog', component: CreateBlog},
  ]
})
