<template>
  <div>
    <h1>{{title}}</h1>
    <editor id="ueditor-demo2"></editor>
    <button @click="save">save</button>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import editor from '../cpmponents.utils/editor.vue';
  const CreateBlog = {
    data:function(){
      return {
        content:'123'
      }
    },
    computed: {
      ...mapState({
        editingContent:state=>state.test.editingContent,
        title:state=>state.test.title
      })
    },
    components:{
      editor:editor
    },
    methods:{
      save(){
        console.log(this.content);
      }
    }
  };
  export default CreateBlog;
</script>
<style scoped>


</style>
