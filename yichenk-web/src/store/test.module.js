const state = {
  title:'better yichen',
  editingContent:'<h1>demo</h1>'
};
const mutations = {
  saveContent(state,content){
    state.editingContent = content;
  }
};
const actions = {};
const getters = {};




export default {
  state, mutations, actions, getters
}
