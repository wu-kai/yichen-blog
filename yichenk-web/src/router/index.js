import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/Manage'
import Home from '@/components/Home'
import BlogList from '@/components/BlogList'
import BlogDetails from '@/components/BlogDetails'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/Home', name: 'home', component: Home},
    {path: '/manage/:id', name: 'manage', component: Manage},
    {path: '/manage', name: 'manage', component: Manage},
    {path: '/blogList', name: 'blogList', component: BlogList},
    {path: '/details', name: 'details', component: BlogDetails},
  ]
})
