const state = {
  title:'更好的yichenk',
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
