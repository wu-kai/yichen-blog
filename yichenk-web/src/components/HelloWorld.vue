<template>
  <div>
    <h1>更好的一尘</h1>
    {{demo}}
    <UEditorComponent></UEditorComponent>
    <div id="ueditor-demo" v-vueUEditor></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  import UEditorComponent from '../cpmponents.utils/VueUEditor.vue'
  const HelloWorld = {
    data:function(){
      return {}
    },
    computed:mapState({
      demo:state=>state.demo
    }),
    components:{
      UEditorComponent:UEditorComponent
    }
  };
  export default HelloWorld;
</script>
<style scoped>


</style>
