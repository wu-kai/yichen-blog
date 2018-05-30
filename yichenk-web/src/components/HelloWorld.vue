<template>
  <div>
    <h1>更好的一尘</h1>
    {{demo}}
    <editor id="ueditor-demo2"></editor>
    <button @click="save">save</button>
    <div v-html="$store.state.editingContent"></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import editor from '../cpmponents.utils/editor.vue';
  const HelloWorld = {
    data:function(){
      return {
        content:'123'
      }
    },
    computed:mapState({
      demo:state=>state.demo
    }),
    components:{
      editor:editor
    },
    methods:{
      save(){
        console.log(this.content);

      }
    }
  };
  export default HelloWorld;
</script>
<style scoped>


</style>
