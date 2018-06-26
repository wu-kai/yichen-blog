import Vue from 'vue';
import Vuex from 'vuex';
import testModule from './test.module.js';
import blogModule from './blog.module.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    homeTitle:'Better Yichen',
    menuShow:false,
    menuList:[
      {name:'home',value:'Home'},
      {name:'blogList',value:'BlogList'}
    ]
  },
  mutations:{
    switchMenu(state){
      state.menuShow = !state.menuShow;
    },
    hideMenu(state){
      state.menuShow = false;
    }
  },
  modules:{
    test:testModule,
    blog:blogModule
  }
});

export default store;
