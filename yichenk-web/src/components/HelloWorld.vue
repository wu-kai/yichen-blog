<template>
  <div>
    <h1>更好的一尘</h1>
    {{demo}}
    <div id="ueditor-demo" v-vueUEditor></div>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  const HelloWorld = {
    data:function(){
      return {}
    },
    computed:mapState({
      demo:state=>state.demo
    }),
    components:{
      
    }
  };
  export default HelloWorld;
</script>
<style scoped>


</style>
