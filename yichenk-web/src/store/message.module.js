import axios from 'axios'

const state = {};

const mutations = {};

const actions = {
  getAllMessage:function(context){
    return axios({
      url:'/api/comment/findAll',
      method:'get'
    })
  },
  addMessage:function(context,data){
    return axios({
      url:'api/comment/createComment',
      method:'post',
      data:data
    })
  }
};

const getters = {};

export default {
  state,mutations,actions,getters
}
