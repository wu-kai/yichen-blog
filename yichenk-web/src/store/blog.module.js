import axios from 'axios'

const state = {
  blogList:[],
  editingBlogTitle:'',
  editingBlogLabels:'',
  editingBlogImage:'',
  editingBlogAuthor:'',
  editingBlogInfo:'',
  editingBlogContent:''
};
const mutations = {
  saveTempBlogContent(state,content){
    state.editingBlogContent = content;
  },
  updateEditingBlog(state,blog){
    state.editingBlogTitle = blog.title || '';
    state.editingBlogLabels = blog.labels || '';
    state.editingBlogImage = blog.image || '';
    state.editingBlogAuthor = blog.author || '';
    state.editingBlogInfo = blog.info || '';
  },
  clearEditingBlog(state){
    state.editingBlogTitle = '';
    state.editingBlogLabels = '';
    state.editingBlogContent = '';
    state.editingBlogImage = '';
    state.editingBlogAuthor = '';
    state.editingBlogInfo = '';
  }
};
const actions = {
  createBlog(context){
    const blog = {
      title:context.state.editingBlogTitle,
      author:context.state.editingBlogAuthor,
      body:context.state.editingBlogContent,
      label:context.state.editingBlogLabels,
      image:context.state.editingBlogImage,
      info:context.state.editingBlogInfo,
    };
    return axios({
      method:'POST',
      url:'/api/blog/createBlog',
      data:blog
    })
  }

};
const getters = {
  editingBlog(state){
    return {
      title:state.editingBlogTitle,
      labels:state.editingBlogLabels,
      image:state.editingBlogImage,
      author:state.editingBlogAuthor,
      content:state.editingBlogContent,
      info:state.editingBlogInfo,

    }
  }
};

export default {
  state,mutations,actions,getters
}
