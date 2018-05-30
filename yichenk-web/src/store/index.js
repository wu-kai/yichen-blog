import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    demo:'vuex demo',
    editingContent:'<h1>demo</h1>'
  },
  mutations:{
    saveContent(state,content){
      state.editingContent = content;
    }
  }
});

export default store;
