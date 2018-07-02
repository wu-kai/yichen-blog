import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/Manage'
import Home from '@/components/Home'
import BlogList from '@/components/BlogList'
import Resume from '@/components/Resume'
import BlogListBox from '@/components.common/BlogListBox'
import BlogDetailsBox from '@/components.common/BlogDetailsBox'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/Home', name: 'home_', component: Home},
    {path: '/manage/:id', name: 'manage', component: Manage},
    {path: '/manage', name: 'manage_', component: Manage},
    {path: '/resume', name: 'resume', component: Resume},
    {
      path: '/blogList/', name: 'blogList', component: BlogList,
      children: [
        {path:'',component:BlogListBox},
        {path:'blogDetailsBox/:id',component:BlogDetailsBox},
      ]
    },
  ]
})
