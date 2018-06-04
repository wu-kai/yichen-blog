import Vue from 'vue'
import Router from 'vue-router'
import CreateBlog from '@/components/CreateBlog'
import Home from '@/components/Home'
import BlogList from '@/components/BlogList'
import BlogDetails from '@/components/BlogDetails'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/Home', name: 'Home', component: Home},
    {path: '/createBlog', name: 'CreateBlog', component: CreateBlog},
    {path: '/blogList', name: 'blogList', component: BlogList},
    {path: '/details', name: 'details', component: BlogDetails},
  ]
})
