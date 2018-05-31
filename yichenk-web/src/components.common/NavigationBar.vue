<template>
  <div class="fa fa-bars bar" @click="showMenu()"></div>
</template>

<script>

  export default {
    name: 'NavigationBar',
    mounted(){},
    methods:{
      showMenu(){
        this.$store.commit('switchMenu')
      }
    }
  }
</script>

<style scoped>
  .bar:hover{
    color: #42a5f5;
    cursor: pointer;
  }
  .bar{
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    font-size: 30px;
  }
</style>
