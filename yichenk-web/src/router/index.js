import Vue from 'vue'
import Router from 'vue-router'
import Manage from '@/components/Manage'
import CreateBlog from '@/components.manage/CreateBlog'
import Index from '@/components.manage/Index'
import Home from '@/components/Home'
import BlogList from '@/components/BlogList'
import Resume from '@/components/Resume'
import MessageBoard from '@/components/MessageBoard'
import BlogListBox from '@/components.common/BlogListBox'
import BlogDetailsBox from '@/components.common/BlogDetailsBox'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/Home', name: 'home_', component: Home},
    {path: '/manage', component: Manage,
      children:[
        {path: '', component: Index},
        {path: 'index', component: Index},
        {path: 'createBlog', component: CreateBlog},
        {path: 'createBlog/:id', component: CreateBlog},
      ]
    },
    {path: '/resume', name: 'resume', component: Resume},
    {path: '/messageBoard', name: 'messageBoard', component: MessageBoard},
    {
      path: '/blogList', component: BlogList,
      children: [
        {path: '', component: BlogListBox},
        {path: 'blogDetailsBox/:id', component: BlogDetailsBox},
      ]
    },
  ]
})
