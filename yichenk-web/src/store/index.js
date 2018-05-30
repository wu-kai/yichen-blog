import Vue from 'vue';
import Vuex from 'vuex';
import testModule from './test.module.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{},
  mutations:{},
  modules:{
    test:testModule
  }
});

export default store;
